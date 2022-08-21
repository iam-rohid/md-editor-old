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

  async update(notebookId: string, dto: UpdateNotebookDto, authorId: string) {
    await this.findOne(notebookId, authorId);
    return await this.prisma.notebook.update({
      where: {
        id: notebookId,
      },
      data: {
        title: dto.title,
        description: dto.description,
        parent:
          typeof dto.parentId !== 'undefined'
            ? {
                connect: {
                  id: dto.parentId,
                },
              }
            : undefined,
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

  async notes(notebookId: string, authorId: string) {
    return this.prisma.note.findMany({
      where: {
        notebook: {
          id: notebookId,
        },
        author: {
          id: authorId,
        },
      },
    });
  }
}
