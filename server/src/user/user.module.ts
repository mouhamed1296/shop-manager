import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/shared/hash.service';
import { GenerateService } from 'src/shared/generate.service';
import { RolesService } from './role/role.service';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission])],
  controllers: [UserController],
  providers: [UserService, HashService, GenerateService, RolesService],
  exports: [UserService],
})
export class UserModule {}
