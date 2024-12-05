// manga.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MangaService } from './manga.service';
import { Manga } from './manga.entity';
import { ObjectId } from 'mongodb';

const mockMangaRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('MangaService', () => {
  let service: MangaService;
  let repository: MockRepository<Manga>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MangaService,
        {
          provide: getRepositoryToken(Manga),
          useFactory: mockMangaRepository,
        },
      ],
    }).compile();

    service = module.get<MangaService>(MangaService);
    repository = module.get<MockRepository<Manga>>(getRepositoryToken(Manga));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new manga', async () => {
      const createMangaDto = { title: 'Naruto' };
      const savedManga = { id: new ObjectId(), ...createMangaDto };

      repository.create.mockReturnValue(savedManga);
      repository.save.mockResolvedValue(savedManga);

      const result = await service.create(createMangaDto);
      expect(repository.create).toHaveBeenCalledWith(createMangaDto);
      expect(repository.save).toHaveBeenCalledWith(savedManga);
      expect(result).toEqual(savedManga);
    });
  });

  describe('findAll', () => {
    it('should return an array of mangas', async () => {
      const mangas = [{ title: 'Naruto' }];
      repository.find.mockResolvedValue(mangas);

      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mangas);
    });
  });

  describe('findOne', () => {
    it('should return a manga by ID', async () => {
      const id = new ObjectId();
      const manga = { id, title: 'Naruto' };
      repository.findOneBy.mockResolvedValue(manga);

      const result = await service.findOne(id.toHexString());
      expect(repository.findOneBy).toHaveBeenCalledWith({
        id: expect.any(ObjectId),
      });
      expect(result).toEqual(manga);
    });
  });

  describe('update', () => {
    it('should update a manga by ID', async () => {
      const id = new ObjectId();
      const updateMangaDto = { title: 'One Piece' };
      const updatedManga = { id, ...updateMangaDto };

      repository.update.mockResolvedValue(updatedManga);
      repository.findOneBy.mockResolvedValue(updatedManga);

      const result = await service.update(id.toHexString(), updateMangaDto);
      expect(repository.update).toHaveBeenCalledWith(
        expect.any(ObjectId),
        updateMangaDto,
      );
      expect(result).toEqual(updatedManga);
    });
  });

  describe('delete', () => {
    it('should delete a manga by ID', async () => {
      const id = new ObjectId();

      repository.delete.mockResolvedValue(undefined);

      await service.delete(id.toHexString());
      expect(repository.delete).toHaveBeenCalledWith(expect.any(ObjectId));
    });
  });
});
