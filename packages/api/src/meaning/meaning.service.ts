import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeaningDto } from './dto/create-meaning.dto';
import { Meaning } from './entities/meaning.entity';

@Injectable()
export class MeaningService {
  constructor(
    @InjectRepository(Meaning)
    private readonly meaningRepository: Repository<Meaning>,
  ) {}

  async create(createMeaningDto: CreateMeaningDto) {
    await this.meaningRepository.save({
      id: randomUUID(),
      text: createMeaningDto.text,
    });
  }
}
