import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entity/quote.entity';
import { CreateQuoteDto } from './dto/quote/create-quote.dto';
import { UpdateQuoteDto } from './dto/quote/update-quote.dto';

export type QuoteDto = {
  id: number;
  quote: string;
  author: string;
};

@Injectable()
export class QuoteService {
  constructor(@InjectRepository(Quote) private quoteRepo: Repository<Quote>) {}

  createQuote(quoteDto: CreateQuoteDto): Promise<Quote> {
    const newQuote = this.quoteRepo.create(quoteDto);
    return this.quoteRepo.save(newQuote);
  }

  findAll(): Promise<Quote[]> {
    return this.quoteRepo.find();
  }

  async findOne(id: number): Promise<Quote> {
    const quote = await this.quoteRepo.findOneBy({ id });
    if (!quote) {
      throw new NotFoundException('Quote not found');
    }
    return quote;
  }

  async updateQuote(id: number, quoteDto: UpdateQuoteDto): Promise<Quote> {
    const existingQuote = await this.findOne(id);
    const updatedQuote = this.quoteRepo.merge(existingQuote, quoteDto);
    return this.quoteRepo.save(updatedQuote);
  }

  async deleteQuote(id: number): Promise<void> {
    const result = await this.quoteRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Quote not found');
    }
  }
}
