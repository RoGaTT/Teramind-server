import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { generateHash } from 'src/utils/crypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();

    user.password = await generateHash(createUserDto.password);
    user.username = createUserDto.username;

    await this.usersRepository.save(user);

    return 'OK';
  }

  async findByName(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  // async findByToken(token: string) {
  //   const userId = this.jwtService;
  // }

  findAll() {
    return `This action returns all user`;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }
}
