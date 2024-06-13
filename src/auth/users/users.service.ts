import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from './user-roles';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: UserRole.USER,
      },
    });
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
