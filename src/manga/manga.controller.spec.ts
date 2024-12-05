// manga.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { Manga } from './manga.entity';
import { ObjectId } from 'mongodb';

describe('MangaController', () => {
  let controller: MangaController;
  let service: MangaService;

  const mockMangaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MangaController],
      providers: [
        {
          provide: MangaService,
          useValue: mockMangaService,
        },
      ],
    }).compile();

    controller = module.get<MangaController>(MangaController);
    service = module.get<MangaService>(MangaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new manga', async () => {
    const mangaDto: Partial<Manga> = { title: 'Naruto' };
    const savedManga: Manga = {
      id: new ObjectId(),
      title: 'Naruto',
      createdAt: new Date(),
    };

    jest.spyOn(service, 'create').mockResolvedValue(savedManga);

    const result = await controller.create(mangaDto);
    expect(service.create).toHaveBeenCalledWith(mangaDto);
    expect(result).toEqual(savedManga);
  });

  it('should return all mangas', async () => {
    const mangas: Manga[] = [
      {
        id: new ObjectId(),
        title: 'Naruto',
        createdAt: new Date(),
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(mangas);

    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(mangas);
  });

  it('should return a manga by ID', async () => {
    const id = new ObjectId().toHexString();
    const manga: Manga = {
      id: new ObjectId(id),
      title: 'Naruto',
      createdAt: new Date(),
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(manga);

    const result = await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(result).toEqual(manga);
  });

  it('should update a manga by ID', async () => {
    const id = new ObjectId().toHexString();
    const updateDto: Partial<Manga> = { title: 'One Piece' };
    const updatedManga: Manga = {
      id: new ObjectId(id),
      title: 'One Piece',
      createdAt: new Date(),
    };
    jest.spyOn(service, 'update').mockResolvedValue(updatedManga);

    const result = await controller.update(id, updateDto);
    expect(service.update).toHaveBeenCalledWith(id, updateDto);
    expect(result).toEqual(updatedManga);
  });

  it('should delete a manga by ID', async () => {
    const id = new ObjectId().toHexString();
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);

    await controller.delete(id);
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
