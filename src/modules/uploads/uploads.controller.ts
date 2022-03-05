import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserId } from '../auth/auth.interceptor';
import * as mime from 'mime-types';
import { Response } from 'express';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  create(
    @UploadedFiles() files: Partial<Record<string, Express.Multer.File>>,
    @UserId() userId,
  ) {
    const file = files.file[0];
    console.log('first');
    if (!file) throw new HttpException('No file', HttpStatus.NO_CONTENT);

    return this.uploadsService.create(userId, file);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@UserId() userId) {
    return this.uploadsService.findAllByUser(userId);
  }

  @Get('download/:id')
  @UseGuards(AuthGuard('jwt'))
  downloadById(
    @UserId() userId,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    const mimeType = mime.lookup('4997ddf4-90c3-44f8-b037-eaa1824f5120.deb');
    console.log('object');
    if (mimeType) response.setHeader('Content-Type', mimeType);
    else response.setHeader('Content-Type', 'text/plain');

    return this.uploadsService.downloadFileById(response, userId, id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findById(@Param('id') id: string, @UserId() userId) {
    return this.uploadsService.getById(userId, id);
  }
}
