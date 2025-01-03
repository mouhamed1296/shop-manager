import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UserService } from 'src/user/user.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createProductDto) {
    const user = await this.userService.findOne(
      createProductDto.connectedUserId,
    );

    // Check if the product already exists
    const checkResult = await this.productService.verifyProductExistance(
      createProductDto,
    );

    // If the product exists, increment the quantity
    if (checkResult.exist) {
      const product = this.productService.incrementQuantity(
        checkResult.product,
        createProductDto,
      );
      await this.productService.update(product.id, product);

      console.log(checkResult.product);

      return checkResult.product;
    }

    // Otherwise, create a new product
    const newProduct = await this.productService.create(createProductDto, user);

    console.log(newProduct);

    return newProduct;
  }

  @Post('many')
  async createMany(@Body() products) {
    console.log(products);
    const user = await this.userService.findOne(products[0].connectedUserId);

    // Add products to the database with the user who created them
    const newProducts = await this.productService.addProducts(products, user.id);


    return newProducts;
  }

  @Get()
  findAll() {
    return this.productService.findAllWithUserAndJustificatif(1, 50);
  }

  // get out of stock products by entrepot
  @Get('outofstock/:entrepot')
  getOutOfStockProductsByEntrepot(@Param('entrepot') entrepot: number) {
    return this.productService.getOutOfStockProductsByEntrepot(entrepot);
  }

  @Get('low-stock')
  getLowStockProducts() {
    return this.productService.getLowStockProducts();
  }

  // get products available in one warehouse and not in another
  @Get('available/:fromWarehouse/:toWarehouse')
  findProductsAvailableInOneWarehouseAndNotInAnother(
    @Param('fromWarehouse') fromWarehouse: number,
    @Param('toWarehouse') toWarehouse: number,
  ) {
    return this.productService.findProductsAvailableInOneWarehouseAndNotInAnother(
      fromWarehouse,
      toWarehouse,
    );
  }

  // get all products in an entrepot
  @Get('entrepot/:entrepot/:page/:limit')
  findManyByEntrepot(
    @Param('entrepot') entrepot: number,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    return this.productService.findManyByEntrepot(page, limit, entrepot);
  }

  // filter products in an entrepot
  @Get('filter/:entrepot/:filter')
  filterProductsInEntrepot(
    @Param('entrepot') entrepot: number,
    @Param('filter') filter: string,
  ) {
    return this.productService.filterProductsInEntrepot(filter, entrepot);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    console.log(id);

    return this.productService.remove(+id);
  }
}
