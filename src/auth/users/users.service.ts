import { Injectable } from '@nestjs/common';
import { CreatePartnerUserDto } from './dto/create-partner-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from './user-roles';
import * as bcrypt from 'bcrypt';
import { CreateCommonUserDto } from './dto/create-common-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  createCommonUser(data: CreateCommonUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRole.USER],
      },
    });
  }

  createPartnerUser(data: CreatePartnerUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRole.PARTNER],
      },
    });
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
