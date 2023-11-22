import { Test, TestingModule } from '@nestjs/testing';
import { MeaningService } from './meaning.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meaning } from './entities/meaning.entity';

const saveMock = jest.fn();

describe('MeaningService', () => {
  let service: MeaningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeaningService,
        {
          provide: getRepositoryToken(Meaning),
          useValue: {
            save: saveMock,
          },
        },
      ],
    }).compile();

    service = module.get<MeaningService>(MeaningService);
  });

  afterEach(jest.clearAllMocks);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should attach an ID and persist the data', async () => {
    await service.create({ text: 'This is a test!' });

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith({
      id: expect.any(String),
      text: 'This is a test!',
    });
  });
});
