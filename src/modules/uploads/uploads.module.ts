import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { MulterModule } from '@nestjs/platform-express';
import { generateMulterStorage } from 'src/utils/multer';
import PATHS_CONFIG from 'src/const/paths';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  imports: [
    TypeOrmModule.forFeature([Upload]),
    UserModule,
    // MulterModule.register({
    //   storage: generateMulterStorage(PATHS_CONFIG.FILE_STORAGE_UPLOADS),
    // }),
  ],
})
export class UploadsModule {}
