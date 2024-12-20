import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/shared/hash.service';
import { ProductsRepository } from './product.repository';
import { Role } from 'src/user/entities/role.entity';
import { Permission } from 'src/user/entities/permission.entity';
import { RolesService } from 'src/user/role/role.service';

@Module({
  imports: [
    // Add the following imports
    TypeOrmModule.forFeature([Produit]),
    TypeOrmModule.forFeature([User, Role, Permission]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    UserService,
    HashService,
    ProductsRepository,
    RolesService,
  ],
  exports: [ProductService, ProductsRepository],
})
export class ProductModule {}
