import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

@Injectable()
export class NotebooksService {
  constructor(private prisma: PrismaService) {}

  async create(createNotebookDto: CreateNotebookDto, authorId: string) {
    try {
      const notebook = await this.prisma.notebook.create({
        data: {
          author: {
            connect: {
              id: authorId,
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

  async findAll(authorId: string) {
    console.log(authorId);
    try {
      return await this.prisma.notebook.findMany({
        where: {
          authorId: authorId,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string, authorId: string) {
    try {
      const notebook = await this.prisma.notebook.findUnique({
        where: {
          id,
        },
      });
      if (notebook.authorId !== authorId) {
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
    authorId: string,
  ) {
    await this.findOne(id, authorId);
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

  async remove(id: string, authorId: string) {
    await this.findOne(id, authorId);
    return this.prisma.notebook.delete({
      where: {
        id,
      },
    });
  }
}
