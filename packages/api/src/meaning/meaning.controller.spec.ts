import { Test, TestingModule } from '@nestjs/testing';
import { MeaningController } from './meaning.controller';
import { MeaningService } from './meaning.service';
import { BadGatewayException, BadRequestException } from '@nestjs/common';

const createMockPlaceholder = jest.fn();

describe('MeaningController', () => {
  let controller: MeaningController;
  let service: MeaningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeaningController],
      providers: [MeaningService],
    })
      .overrideProvider(MeaningService)
      .useValue({
        create: createMockPlaceholder,
      })
      .compile();

    controller = module.get<MeaningController>(MeaningController);
    service = module.get<MeaningService>(MeaningService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call `meaningService.create` if data is valid', async () => {
    const createMock = jest.spyOn(service, 'create').mockResolvedValue();
    const response = await controller.create({ text: 'This is a test!' });

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({ text: 'This is a test!' });
    expect(response).toBe('OK');
  });

  it('should throw a `BadRequest` exception if data is invalid', async () => {
    const createMock = jest.spyOn(service, 'create').mockResolvedValue();

    await expect(controller.create({ text: '' })).rejects.toThrowError(
      BadRequestException,
    );
    expect(createMock).not.toHaveBeenCalled();
  });

  it('should throw a `BadGateway` exception if an unexpected error is encountered', async () => {
    const createMock = jest
      .spyOn(service, 'create')
      .mockRejectedValue(new Error('Oops!'));

    await expect(
      controller.create({ text: 'This is a test!' }),
    ).rejects.toThrowError(BadGatewayException);
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({ text: 'This is a test!' });
  });
});
