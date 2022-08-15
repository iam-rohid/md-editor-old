import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
        },
      });
      return user;
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
        throw new HttpException(
          'Failed to create profile',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(
    id: string,
    options?: {
      keepPassword?: boolean;
      includeProfile?: boolean;
      includeNotebooks?: boolean;
      includeNotes?: boolean;
    },
  ) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          profile: options?.includeProfile === true,
          notebooks: options?.includeNotebooks === true,
          notes: options?.includeNotes === true,
        },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (options?.keepPassword) {
        return user;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      return {
        ...safeUser,
        password: null,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      throw e;
    }
  }

  async findOneByEmail(
    email: string,
    options?: {
      keepPassword?: boolean;
      includeProfile?: boolean;
      includeNotebooks?: boolean;
      includeNotes?: boolean;
    },
  ): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          profile: options?.includeProfile === true,
          notebooks: options?.includeNotebooks === true,
          notes: options?.includeNotes === true,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (options?.keepPassword) {
        return user;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      return {
        ...safeUser,
        password: null,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      throw e;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
