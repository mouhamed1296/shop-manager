import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-product.dto';
import { UpdateProduitDto } from './dto/update-product.dto';
import { Produit } from './entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { ProductsRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductsRepository) {
    /* */
  }

  async verifyProductExistance(productData: CreateProduitDto) {
    const existingProduct = await this.productRepository.findProductByCode(
      productData.code_produit,
    );

    return {
      product: existingProduct,
      exist: !!existingProduct,
    };
  }

  incrementQuantity(existingProduct: Produit, productData: CreateProduitDto) {
    existingProduct.quantite += productData.quantite;
    return existingProduct;
  }

  async create(createProductDto: CreateProduitDto, user: User) {
    // Create a new product
  }

  // add products to the database with the user who created them and the justificatif
  async addProducts(products: CreateProduitDto[], user: User) {
    const newProducts = await this.productRepository.createMany(
      products.map((product) => ({
        ...product,
        user,
      })),
    );

    await this.productRepository.saveMany(newProducts);

    return newProducts;
  }

  // get all products with the user who created them and the justificatif and pagination
  async findAllWithUserAndJustificatif(page = 1, limit = 10) {
    return await this.productRepository.findAllWithUserAndJustificatif(
      page,
      limit,
    );
  }

  // liste des produits disponible dans un entrepot et non disponible dans un autre
  async findProductsAvailableInOneWarehouseAndNotInAnother(
    fromWarehouse: number,
    toWarehouse: number,
  ) {
    return await this.productRepository.findProductsAvailableInOneWarehouseAndNotInAnother(
      fromWarehouse,
      toWarehouse,
    );
  }

  // liste des produits en rupture de stock dans un entrepot
  async getOutOfStockProductsByEntrepot(entrepot: number) {
    return await this.productRepository.getOutOfStockProductsByEntrepot(
      entrepot,
    );
  }

  // liste des produits dans un entrepot
  async findManyByEntrepot(page: number, limit: number, entrepot: number) {
    return await this.productRepository.findManyByEntrepot(
      page,
      limit,
      entrepot,
    );
  }

  // Liste des produits en rupture de stock
  async getLowStockProducts() {
    return await this.productRepository.getLowStockProducts();
  }

  // liste des produits en rupture de stock dans un entrepot
  async getLowStockProductsByEntrepot(entrepot: number) {
    return await this.productRepository.getLowStockProductsByEntrepot(entrepot);
  }

  async filterProductsInEntrepot(filter: any, entrepot: number) {
    return await this.productRepository.filterProducts(filter, entrepot);
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: number) {
    return await this.productRepository.findOne(id);
  }


  update(id: number, updateProductDto: UpdateProduitDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  updateProductQuantity(products: Partial<Produit>[]) {
    return this.productRepository.updateQuantity(products);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}