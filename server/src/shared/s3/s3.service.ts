import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  /* AWS credentials */
  private readonly bucketName: string =
    this.configService.get<string>('AWS_BUCKET_NAME');
  private readonly region: string =
    this.configService.get<string>('AWS_REGION');
  private readonly accessKeyId: string =
    this.configService.get<string>('AWS_ACCESS_KEY_ID');
  private readonly secretAccessKey: string = this.configService.get<string>(
    'AWS_SECRET_ACCESS_KEY',
  );

  /* S3 Client */
  private readonly s3 = new S3Client({
    region: this.region,
    credentials: {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    },
  });

  /* Constructor */
  constructor(private readonly configService: ConfigService) {}

  // Upload file to S3
  async uploadFile(file: Buffer, fileName: string, fileType: string) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file,
      ContentType: fileType,
    };

    return await this.s3.send(new PutObjectCommand(params));
  }

  // Get signed url for file
  async getFileUrl(fileName: string) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    const command = new GetObjectCommand(params);

    const url = await getSignedUrl(this.s3, command, {
      expiresIn: 3600,
    });

    return url;
  }

  // Delete file
  async deleteFile(fileName: string) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(params);

    return await this.s3.send(command);
  }
}
