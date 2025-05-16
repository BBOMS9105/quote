import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuoteService, QuoteDto } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  createQuote(@Body() quote: QuoteDto) {
    return this.quoteService.create(quote);
  }

  @Get()
  getQuotes() {
    return this.quoteService.findAll();
  }

  @Get(':id')
  getQuoteById(@Param('id') id: number) {
    return this.quoteService.findOne(id);
  }
}
