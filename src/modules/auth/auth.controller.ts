import {
  Body,
  Controller,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Headers,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { isPasswordHashMatch } from 'src/utils/crypt';
import { UserId } from './auth.interceptor';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Res() response: Response,
    @Body() loginDto: LoginAuthDto,
    @Headers('Origin') hostname: string,
  ) {
    const user = await this.userService.findByName(loginDto.username);
    const isPaswordMatch = await isPasswordHashMatch(
      loginDto.password,
      user.password,
    );

    if (!user || !isPaswordMatch) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const payload = { userId: user.id };
    console.log(process.env.JWT_SECRET);
    const token = this.jwtService.sign(payload);
    console.log(hostname);

    response
      .cookie('access_token', token, {
        httpOnly: false,
        domain: '.altdenter.ru', // your domain here!
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
  }
}
