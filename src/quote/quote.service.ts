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

  createQuote(quote: QuoteDto) {
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

  async updateQuote(id: number, quote: QuoteDto) {
    const existingQuote = await this.findOne(id);
    if (!existingQuote) {
      throw new NotFoundException('Quote not found');
    }
    const updatedQuote = this.quoteRepo.merge(existingQuote, quote);
    return this.quoteRepo.save(updatedQuote);
  }

  async deleteQuote(id: number) {
    const result = await this.quoteRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Quote not found');
    }
  }
}
