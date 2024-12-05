import { MangaService } from './manga.service';
import { Manga } from './manga.entity';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('mangas')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Post()
  async create(@Body() createMangaDto: Partial<Manga>): Promise<Manga> {
    return await this.mangaService.create(createMangaDto);
  }

  @Get()
  async findAll(): Promise<Manga[]> {
    return await this.mangaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Manga> {
    return await this.mangaService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMangaDto: Partial<Manga>,
  ): Promise<Manga> {
    return await this.mangaService.update(id, updateMangaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.mangaService.delete(id);
  }
}
