import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

type Payload = {
  email: string;
  roles: string[];
  permissions: string[];
  id: number;
};

@Injectable()
export class AuthService {
  logger = new ConsoleLogger();
  Roles = {
    ROLE_VENDEUR: 1000,
    ROLE_PROPRIETAIRE: 3000,
    ROLE_ADMIN: 5000,
    ROLE_SUPER_ADMIN: 7000,
  };

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  //creation de l'acess token pour l'utilisateur
  async generateAccesToken(payload: Payload, expiresIn?: string) {
    //signature du token de l'utilisateur
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn:
          expiresIn ?? this.configService.get('JWT_ACCESS_SECRET_EXPIRES_IN'),
      }),
    };
  }

  //creation du refresh token pour l'utilisateur
  async generateRefreshToken(payload: Payload) {
    //signature du refresh token de l'utilisateur
    return {
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_SECRET_EXPIRES_IN'),
      }),
    };
  }

  //transform roles to numbers
  rolesToNumbers(roles: string[]) {
    return roles.map((role) => this.Roles[role]);
  }
}
