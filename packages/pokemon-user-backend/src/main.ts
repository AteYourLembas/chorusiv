/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  try {
    console.log('Bootstrap is starting...');
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      process.exit(1);
    });

    const app = await NestFactory.create(AppModule);
    console.log('NestJS application created.');

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;

    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
}

console.log('Starting the bootstrap function...');

bootstrap();
