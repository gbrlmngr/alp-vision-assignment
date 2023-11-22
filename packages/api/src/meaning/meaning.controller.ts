import {
  Controller,
  Post,
  Body,
  BadRequestException,
  BadGatewayException,
  Logger,
} from '@nestjs/common';
import { schema } from '@alp-vision-assignment/shared/dist/validation-schemas/meaning-of-life';
import { MeaningService } from './meaning.service';
import { CreateMeaningDto } from './dto/create-meaning.dto';

@Controller({
  path: 'meaning',
  version: '1',
})
export class MeaningController {
  private logger = new Logger(MeaningController.name);

  constructor(private readonly meaningService: MeaningService) {}

  @Post()
  async create(@Body() createMeaningDto: CreateMeaningDto) {
    const parsedDto = schema.safeParse(createMeaningDto);

    if (!parsedDto.success) {
      throw new BadRequestException();
    }

    try {
      await this.meaningService.create(parsedDto.data);
      return 'OK';
    } catch (error: unknown) {
      this.logger.error(
        `Encountered error during Meaning creation: ${
          (error as Error).message
        }`,
      );
      throw new BadGatewayException();
    }
  }
}
