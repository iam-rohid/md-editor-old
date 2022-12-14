import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('notebooks')
export class NotebooksController {
  constructor(private readonly notebooksService: NotebooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNotebookDto: CreateNotebookDto, @Request() req: any) {
    const {
      user: { userId },
    } = req;
    return this.notebooksService.create(createNotebookDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    const {
      user: { userId },
    } = req;
    return this.notebooksService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    const {
      user: { userId },
    } = req;
    return this.notebooksService.findOne(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateNotebookDto,
    @Request() req: any,
  ) {
    const {
      user: { userId },
    } = req;
    return this.notebooksService.update(id, dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const {
      user: { userId },
    } = req;
    return this.notebooksService.remove(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/notes')
  notes(@Request() req: any, @Param('id') notebookId: string) {
    const {
      user: { userId },
    } = req;
    return this.notebooksService.notes(notebookId, userId);
  }
}
