import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './errors/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //

  app.use(cookieParser());
  app.enableCors({
    /*  origin: [
      'http://localhost:5173',
      'http://localhost:1420',
      'ffff:100.64.0.2',
    ], */
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      // Adjust the logic here to allow your Tauri app's origin
      const allowedOrigins = [
        'http://localhost',
        'https://tauri.localhost',
        'tauri://localhost',
        'http://localhost:1420',
        'https://test.tapisrougecitycenter.com',
      ]; // Add your Tauri app's origin
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('cors error');
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const Adapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(Adapter));

  await app.listen(3002);
}
bootstrap();
