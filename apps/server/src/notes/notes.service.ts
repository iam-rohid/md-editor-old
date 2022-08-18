import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  create(createNoteDto: CreateNoteDto, authorId: string) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        body: createNoteDto.body || '',
        author: {
          connect: {
            id: authorId,
          },
        },
        notebook: createNoteDto.notebookId
          ? {
              connect: {
                id: createNoteDto.notebookId,
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

  async update(id: string, updateNoteDto: UpdateNoteDto, authorId: string) {
    await this.findOne(id, authorId);
    return this.prisma.note.update({
      where: { id },
      data: {
        title: updateNoteDto.title,
        body: updateNoteDto.body,
        notebook: updateNoteDto.notebookId
          ? {
              connect: {
                id: updateNoteDto.notebookId,
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
