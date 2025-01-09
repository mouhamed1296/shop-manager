/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ProductModule } from './product/product.module';
import { Produit } from './product/entities/product.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { Role } from './user/entities/role.entity';
import { Permission } from './user/entities/permission.entity';
import { FournisseurModule } from './fournisseur/fournisseur.module';
import { BoutiqueModule } from './boutique/boutique.module';
import { ApprovisionnementModule } from './approvisionnement/approvisionnement.module';
import { VenteModule } from './vente/vente.module';
import { TracabiliteModule } from './tracabilite/tracabilite.module';
import { Boutique } from './boutique/entities/boutique.entity';
import { LigneVente } from './vente/entities/ligne-vente.entity';
import { Vente } from './vente/entities/vente.entity';
import { Approvisionnement } from './approvisionnement/entities/approvisionnement.entity';
import { Tracabilite } from './tracabilite/entities/tracabilite.entity';
import { Fournisseur } from './fournisseur/entities/fournisseur.entity';
import { LigneApprovisionnement } from './approvisionnement/entities/ligne-approvisionnement.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as any,
        /* type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),*/
        url: configService.get<string>('DB_URL'),
        /*database: configSrvice<string>('DB_NAME'),*/
        entities: [
          User,
          Produit,
          Category,
          Role,
          Permission,
          LigneVente,
          Vente,
          Boutique,
          Approvisionnement,
          LigneApprovisionnement,
          Tracabilite,
          Fournisseur,
        ],
        synchronize: true,
        ssl: true,
      }),
    }),

    /*TypeOrmModule.forRoot({
      type: 'postgres',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      url: '',
      /*database: 'users',
      entities: [User, Agence],
      synchronize: true,
      ssl: true,
    })*/
    SharedModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    FournisseurModule,
    BoutiqueModule,
    ApprovisionnementModule,
    VenteModule,
    TracabiliteModule,
  ],
})
export class AppModule {
  /* */
}
