import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PATHS_CONFIG from 'src/const/paths';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Upload } from './entities/upload.entity';
import * as fs from 'fs';
import { extname } from 'path';
import { Response } from 'express';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
    private userService: UserService,
  ) {}
  async create(userId: string, file: Express.Multer.File) {
    if (
      await this.uploadRepository.findOne({
        where: {
          user: userId,
          filename: file.originalname,
          size: file.size,
        },
      })
    ) {
      throw new HttpException('File already exists', HttpStatus.NOT_ACCEPTABLE);
    }
    const user = await this.userService.findById(userId);
    const upload = new Upload();
    upload.user = user;
    upload.filename = file.originalname;
    upload.size = file.size;
    await this.uploadRepository.save(upload);

    fs.writeFileSync(this.getFilePath(upload.id, upload.filename), file.buffer);
    return upload;
  }

  // saveFile()

  getFilePath(id: string, filename: string) {
    return `${PATHS_CONFIG.FILE_STORAGE_UPLOADS}/${id}.${extname(filename)}`;
  }

  async findAllByUser(userId: string) {
    const data = await this.uploadRepository.find({
      where: {
        user: userId,
      },
    });

    return data;
  }

  async getById(userId: string, id: string): Promise<Upload> {
    const upload = await this.uploadRepository.findOne({
      where: {
        id,
        user: userId,
      },
    });
    console.log(upload);
    return upload;
  }

  async downloadFileById(res: Response, userId: string, id: string) {
    const upload = await this.getById(userId, id);

    const filePath = this.getFilePath(upload.id, upload.filename);

    return res.download(filePath);
  }
}