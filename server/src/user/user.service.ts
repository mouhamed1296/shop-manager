import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/shared/hash.service';
import { LoginDto } from './dto/login.dto';
import { Role } from './entities/role.entity';
import { RolesService } from './role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly roleService: RolesService,
  ) {}

  /*async create(createUserDto: CreateUserDto) {
    //Vérifier si l'utilisateur existe déjà
    const userExist = await this.findOneByEmail(createUserDto.email);

    //Si l'utilisateur existe déjà, on renvoie une erreur
    if (userExist)
      throw new ConflictException("L'utilisateur existe déjà dans la base");

    //Sinon on hash le mot de passe et on sauvegarde l'agence
    createUserDto.password = await this.hashService.hash(
      createUserDto.password,
    );
    return this.userRepository.save(createUserDto);
  }*/

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, roleIds, ...userData } = createUserDto;

    // Check if the email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const creator = await this.findOne(createUserDto.accountCreatorId);

    //Vérifier si l'utilisateur createur est un super admin ou un propriétaire de boutique 
    if (
      creator.roles.find((role) => role.name === 'ROLE_SUPER_ADMIN') === undefined &&
      creator.roles.find((role) => role.name === 'ROLE_PROPRIETAIRE') === undefined
    ) {
      throw new UnauthorizedException(
        "Vous n'avez pas les droits pour créer un utilisateur",
      );
    }

    // Fetch roles if roleIds are provided
    let roles: Role[] = [];
    if (roleIds && roleIds.length > 0) {
      roles = await this.roleService.findByIds(roleIds);
    }

    // Hash the password
    userData.password = await this.hashService.hash(userData.password);

    // Create and save the new user
    const user = this.userRepository.create({ ...userData, email, roles });
    return this.userRepository.save(user);
  }

  /**
   * Connexion à un compte agence
   */
  async login(loginDto: LoginDto) {
    // Vérifier si l'utilisateur existe
    const user = await this.findOneByEmail(loginDto.email);

    console.log(user);

    const roles = user.roles.map((role) => role.name);
    const permissions = user.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.name),
    );

    console.log(permissions);

    // Vérifier si l'utilisateur existe
    this.checkUserExist(user);

    // Vérifier si le mot de passe est correct
    await this.isPasswordValid(user, loginDto.password);
    // Récupérer l'agence sans le mot de passe
    const userWithoutPassword = this.getUserWithoutPassword(user);

    console.log(userWithoutPassword);

    return {
      email: userWithoutPassword.email,
      roles: roles,
      permissions: permissions,
      refreshToken: userWithoutPassword.refreshToken,
      id: userWithoutPassword.id,
    };
  }

  // Renvoyer l'utilisateur sans le mot de passe
  public getUserWithoutPassword(user: User) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Vérifier si l'utilisateur existe
  private checkUserExist(user: User) {
    if (!user)
      throw new BadRequestException(
        "L'utilisateur n'existe pas ou a été supprimée",
      );
  }

  // Vérifier si le mot de passe est correct
  private async isPasswordValid(user: User, password: string) {
    const isPasswordCorrect = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Mot de passe incorrect');
  }

  // update the refresh token
  async updateUserRefreshToken(email: string, refreshToken: string | null) {
    return this.userRepository.update({ email: email }, { refreshToken });
  }

  // verify refresh token
  async verifyRefreshToken(refreshToken: string) {
    console.log(refreshToken);
    const user = await this.userRepository.findOneBy({ refreshToken });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    //console.log(user);
    const myUser = await this.findOneByEmail(user.email);

    console.log(myUser);

    return {
      id: myUser.id,
      email: myUser.email,
      roles: myUser.roles,
      refreshToken: myUser.refreshToken,
      permissions: myUser.roles.flatMap((role) =>
        role.permissions.map((permission) => permission.name),
      ),
    };
  }

  // find user by email with roles and permissions
  async findOneByEmail(email: string) {
    const user = await this.userRepository.find({
      relations: ['roles', 'roles.permissions'],
      where: { email },
    });

    return user[0];
  }

  // find users with roles and permissions where the role is ROLE_CAISSIER
  async findCaissiers() {
    return this.userRepository.find({
      relations: ['roles', 'roles.permissions'],
      where: { roles: { name: 'ROLE_CAISSIER' } },
    });
  }

  findAll() {
    return this.userRepository.find({
      relations: ['roles', 'roles.permissions'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
