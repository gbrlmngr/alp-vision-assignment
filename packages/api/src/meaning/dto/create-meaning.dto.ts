import { type TSchema } from '@alp-vision-assignment/shared/dist/validation-schemas/meaning-of-life';

export class CreateMeaningDto implements TSchema {
  text: string;
}
