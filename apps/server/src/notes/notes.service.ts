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

  favoriteNotes(authorId: string) {
    return this.prisma.note.findMany({
      where: {
        authorId,
        favoriteNotes: {
          some: {
            userId: authorId,
          },
        },
      },
      select: {
        id: true,
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

  async update(noteId: string, dto: UpdateNoteDto, authorId: string) {
    await this.findOne(noteId, authorId);
    if (typeof dto.isFavorite === 'boolean') {
      if (dto.isFavorite) {
        await this.prisma.favoriteNotes.create({
          data: {
            user: {
              connect: {
                id: authorId,
              },
            },
            note: {
              connect: {
                id: noteId,
              },
            },
          },
        });
      } else {
        await this.prisma.favoriteNotes.delete({
          where: {
            noteId_userId: {
              noteId: noteId,
              userId: authorId,
            },
          },
        });
      }
    }
    return this.prisma.note.update({
      where: { id: noteId },
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
