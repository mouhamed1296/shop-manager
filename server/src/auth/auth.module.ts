import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategy/accesTokenStrategy';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { HashService } from 'src/shared/hash.service';
import { GenerateService } from 'src/shared/generate.service';
import { RefreshTokenStrategy } from './strategy/refreshTokenStrategy';
import { Role } from 'src/user/entities/role.entity';
import { Permission } from 'src/user/entities/permission.entity';
import { RolesService } from 'src/user/role/role.service';

@Module({
  imports: [
    /*UsersModule,
    AgenceModule,*/
    TypeOrmModule.forFeature([User, Role, Permission]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UserService,
    HashService,
    GenerateService,
    RolesService,
  ],
})
export class AuthModule {}
