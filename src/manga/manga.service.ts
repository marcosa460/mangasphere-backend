import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manga } from './manga.entity';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
  ) {}

  async create(createMangaDto: Partial<Manga>): Promise<Manga> {
    const newManga = this.mangaRepository.create(createMangaDto);
    return await this.mangaRepository.save(newManga);
  }

  async findAll(): Promise<Manga[]> {
    return await this.mangaRepository.find();
  }

  async findOne(id: string): Promise<Manga> {
    return await this.mangaRepository.findOneBy({ id });
  }

  async update(id: string, updateMangaDto: Partial<Manga>): Promise<Manga> {
    await this.mangaRepository.update(id, updateMangaDto);
    return await this.mangaRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.mangaRepository.delete(id);
  }
}
