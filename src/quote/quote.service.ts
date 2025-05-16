import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entity/quote.entity';

export type QuoteDto = {
  id: number;
  quote: string;
  author: string;
};

@Injectable()
export class QuoteService {
  constructor(@InjectRepository(Quote) private quoteRepo: Repository<Quote>) {}

  create(quote: QuoteDto) {
    const newQuote = this.quoteRepo.create(quote);
    return this.quoteRepo.save(newQuote);
  }

  findAll() {
    return this.quoteRepo.find();
  }

  async findOne(id: number) {
    const quote = await this.quoteRepo.findOneBy({ id });
    if (!quote) {
      throw new NotFoundException('Quote not found');
    }
    return quote;
  }
}
