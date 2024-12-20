import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/shared/repository/base-repository';
import { DataSource } from 'typeorm';
import { Produit } from './entities/product.entity';
import { UpdateProduitDto } from './dto/update-product.dto';

@Injectable({ scope: Scope.REQUEST })
export class ProductsRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async create(product: Partial<Produit>) {
    return this.getRepository(Produit).create(product);
  }

  async createMany(products: Partial<Produit>[]) {
    return this.getRepository(Produit).create(products);
  }

  async save(product: Produit) {
    return this.getRepository(Produit).save(product);
  }

  async saveMany(products: Produit[]) {
    return this.getRepository(Produit).save(products);
  }

  // Update a product

  async update(id: number, product: UpdateProduitDto) {
   // implement it
  }

  async updateQuantity(products: Partial<Produit>[]) {
    // implement it
  }

  // get low stock products
  async getLowStockProducts() {
    return this.getRepository(Produit)
      .createQueryBuilder('product')
      .where('product.quantite <= product.seuil_alert')
      .getMany();
  }

  // get products that are about to expire
  /*async getProductsAboutToExpire() {
    return this.getRepository(Product)
      .createQueryBuilder('product')
      .where('product.date_peremption <= :date', {
        date: new Date(),
      })
      .getMany();*/

  async getLowStockProductsByEntrepot(entrepot: number) {
    return this.getRepository(Produit)
      .createQueryBuilder('product')
      .where('product.quantite <= product.seuil_alert')
      .andWhere('product.entrepot = :entrepot', { entrepot })
      .getMany();
  }

  // Delete a product

  async delete(id: number) {
    return this.getRepository(Produit).delete(id);
  }

  // Add methods to interact with the product entity

  async findAll() {
    return this.getRepository(Produit).find();
  }

  // get Many products and paginate them
  async findMany(page: number, limit: number) {
    return this.getRepository(Produit)
      .createQueryBuilder('product')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  // filter products by libelle, code, reference and entrepot
  async filterProducts(filter: any, entrepot: number) {
    //filter can be libelle, code or reference
    return this.getRepository(Produit)
      .createQueryBuilder('product')
      .where('product.entrepot = :entrepot', { entrepot })
      .andWhere('product.libelle LIKE :filter', {
        filter: `%${filter}%`,
      })
      .orWhere('product.code LIKE :filter', {
        filter: `%${filter}%`,
      })
      .orWhere('product.reference LIKE :filter', {
        filter: `%${filter}%`,
      })
      .getMany();
  }

  // get all products from a specific entrepot and paginate them
  async findManyByEntrepot(page: number, limit: number, entrepot: number) {
    return this.getRepository(Produit)
      .createQueryBuilder('product')
      .where('product.entrepot = :entrepot', { entrepot })
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async getOutOfStockProductsByEntrepot(entrepot: number) {
    return this.getRepository(Produit)
      .createQueryBuilder('product')
      .where('product.entrepot = :entrepot', { entrepot })
      .andWhere('product.quantite = 0')
      .getMany();
  }

  async findProductsAvailableInOneWarehouseAndNotInAnother(
    myEntrepot,
    otherEntrepot,
  ) {
    const myEntrepotProducts = await this.getOutOfStockProductsByEntrepot(
      myEntrepot,
    );

    const productsExistInOtherEntrepot = [];

    myEntrepotProducts.forEach(async (product) => {
      const otherEntrepotProduct = await this.getRepository(Produit)
        .createQueryBuilder('product')
        .where('product.entrepot = :entrepot', { entrepot: otherEntrepot })
        .andWhere('product.libelle = :libelle', { libelle: product.libelle })
        .andWhere('product.quantite > 0')
        .getOne();

      if (otherEntrepotProduct) {
        productsExistInOtherEntrepot.push(otherEntrepotProduct);
      }
    });

    return productsExistInOtherEntrepot;
  }

  // findAll with user and justificatif
  async findAllWithUserAndJustificatif(page: number, limit: number) {
    return this.getRepository(Produit)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('product.justificatifs', 'justificatifs')
      .leftJoinAndSelect('product.entrepot', 'entrepot')
      .leftJoinAndSelect('product.rayon', 'rayon')
      .leftJoinAndSelect('product.category', 'category')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async findOne(id: number) {
    return this.getRepository(Produit).findOneBy({ id });
  }

  async findProductByCode(code: string) {
    return this.getRepository(Produit).findOneBy({ code_produit : code
    });
  }
}
