// manga.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manga } from './manga.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
  ) {}

  // Criação de um novo manga
  async create(createMangaDto: Partial<Manga>): Promise<Manga> {
    const newManga = this.mangaRepository.create(createMangaDto);
    return await this.mangaRepository.save(newManga);
  }

  // Busca de todos os mangas
  async findAll(): Promise<Manga[]> {
    return await this.mangaRepository.find();
  }

  // Busca de um manga por ID
  async findOne(id: string): Promise<Manga> {
    const objectId = new ObjectId(id);
    return await this.mangaRepository.findOneBy({ id: objectId });
  }

  // Atualização de um manga por ID
  async update(id: string, updateMangaDto: Partial<Manga>): Promise<Manga> {
    const objectId = new ObjectId(id);
    await this.mangaRepository.update(objectId, updateMangaDto);
    return await this.mangaRepository.findOneBy({ id: objectId });
  }

  // Exclusão de um manga por ID
  async delete(id: string): Promise<void> {
    const objectId = new ObjectId(id);
    await this.mangaRepository.delete(objectId);
  }
}
