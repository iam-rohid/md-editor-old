import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

@Injectable()
export class NotebooksService {
  constructor(private prisma: PrismaService) {}

  async create(createNotebookDto: CreateNotebookDto, userId: string) {
    try {
      const notebook = await this.prisma.notebook.create({
        data: {
          author: {
            connect: {
              id: userId,
            },
          },
          title: createNotebookDto.title,
          description: createNotebookDto.description,
          parent: createNotebookDto.parentId
            ? {
                connect: {
                  id: createNotebookDto.parentId,
                },
              }
            : undefined,
        },
      });
      return notebook;
    } catch (e) {
      throw e;
    }
  }

  async findAll(userId: string) {
    try {
      return await this.prisma.notebook.findMany({
        where: {
          authorId: userId,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const notebook = await this.prisma.notebook.findUnique({
        where: {
          id,
        },
      });
      if (notebook.authorId !== userId) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      return notebook;
    } catch (e) {
      throw e;
    }
  }

  async update(
    id: string,
    updateNotebookDto: UpdateNotebookDto,
    userId: string,
  ) {
    await this.findOne(id, userId);
    return await this.prisma.notebook.update({
      where: {
        id,
      },
      data: {
        title: updateNotebookDto.title,
        description: updateNotebookDto.description,
        parent: {
          connect: {
            id: updateNotebookDto.parentId,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.notebook.delete({
      where: {
        id,
      },
    });
  }
}
