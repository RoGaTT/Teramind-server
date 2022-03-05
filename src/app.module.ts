import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: `mysql://root:${process.env.MYSQL_ROOT_PASSWORD}@mysql:3306`,
      database: process.env.MYSQL_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      keepConnectionAlive: true,
    }),
    AuthModule,
    UserModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
