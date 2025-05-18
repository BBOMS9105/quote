import { IsString, Length } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @Length(1, 255)
  quote: string;

  @IsString()
  @Length(1, 255)
  author: string;
}
