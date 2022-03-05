import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      // credentials: true,
    },
  });
  app.use(morgan('tiny'));
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(8080);
  console.log(
    `App is listening on port 8080 in container and ${process.env.APP_PORT} outside`,
  );
}
bootstrap();
