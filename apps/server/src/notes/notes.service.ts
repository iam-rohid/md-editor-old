import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateNoteDto, authorId: string) {
    return this.prisma.note.create({
      data: {
        title: dto.title,
        body: dto.body || '',
        description: dto.description,
        author: {
          connect: {
            id: authorId,
          },
        },
        notebook: dto.notebookId
          ? {
              connect: {
                id: dto.notebookId,
              },
            }
          : undefined,
      },
    });
  }

  findAll(authorId: string) {
    return this.prisma.note.findMany({
      where: {
        authorId,
      },
    });
  }

  findOne(id: string, authorId: string) {
    return this.prisma.note.findFirst({
      where: {
        id,
        authorId,
      },
    });
  }

  async update(id: string, dto: UpdateNoteDto, authorId: string) {
    await this.findOne(id, authorId);
    return this.prisma.note.update({
      where: { id },
      data: {
        title: dto.title,
        body: dto.body,
        description: dto.description,
        notebook: dto.notebookId
          ? {
              connect: {
                id: dto.notebookId,
              },
            }
          : undefined,
      },
    });
  }

  async remove(id: string, authorId: string) {
    await this.findOne(id, authorId);
    return this.prisma.note.delete({ where: { id } });
  }
}
