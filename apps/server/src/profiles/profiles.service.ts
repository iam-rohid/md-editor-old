import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto) {
    try {
      const profile = await this.prisma.profile.create({
        data: {
          fullname: createProfileDto.fullname,
          user: {
            connect: {
              id: createProfileDto.userId,
            },
          },
          profileURL: createProfileDto.profileURL,
        },
      });
      return profile;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
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
    return `This action returns all profiles`;
  }

  async findOne(id: string) {
    try {
      const profile = await this.prisma.profile.findUnique({ where: { id } });
      if (!profile) {
        throw new HttpException('Profile Not Found', HttpStatus.NOT_FOUND);
      }
      return profile;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException('Profile Not Found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
