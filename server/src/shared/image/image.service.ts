import { Injectable } from '@nestjs/common';
import sharp = require('sharp');

@Injectable()
export class ImageService {
  /* Resizing image */
  async resizeImage(
    imageBuffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    return await sharp(imageBuffer)
      .resize({ width: width, height: height, fit: 'inside' })
      .toBuffer();
  }

  /* Compressing image */
  async compressImage(imageBuffer: Buffer): Promise<Buffer> {
    return await sharp(imageBuffer)
      .jpeg({ quality: 80, chromaSubsampling: '4:4:4' })
      .toBuffer();
  }

  /* Convert image to webp */
  async convertToWebp(imageBuffer: Buffer): Promise<Buffer> {
    return await sharp(imageBuffer).webp().toBuffer();
  }

  /* Convert image to png */
  async convertToPng(imageBuffer: Buffer): Promise<Buffer> {
    return await sharp(imageBuffer).png().toBuffer();
  }

  /* Convert image to gif */
  async convertToGif(imageBuffer: Buffer): Promise<Buffer> {
    return await sharp(imageBuffer).gif().toBuffer();
  }
}
