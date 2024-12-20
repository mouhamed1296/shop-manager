import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { GenerateService } from './generate.service';
import { ResendEmailService } from './email/resend-email.service';
import { S3Service } from './s3/s3.service';
import { ImageService } from './image/image.service';
import { ProductsRepository } from 'src/product/product.repository';

@Module({
  providers: [
    HashService,
    GenerateService,
    ResendEmailService,
    S3Service,
    ImageService,
    ProductsRepository,
  ],
  exports: [
    HashService,
    GenerateService,
    ResendEmailService,
    S3Service,
    ImageService,
    ProductsRepository,
  ],
})
export class SharedModule {}
