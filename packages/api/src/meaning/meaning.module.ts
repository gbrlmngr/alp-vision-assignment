import { Module } from '@nestjs/common';
import { MeaningService } from './meaning.service';
import { MeaningController } from './meaning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meaning } from './entities/meaning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meaning])],
  controllers: [MeaningController],
  providers: [MeaningService],
})
export class MeaningModule {}
