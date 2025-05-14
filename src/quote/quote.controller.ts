import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuoteService, Quote } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  getQuote(): { quote: string; author: string } {
    return this.quoteService.getRandomQuote();
  }

  @Get(':id')
  getQuoteById(@Param('id') id: number): Quote {
    return this.quoteService.getQuoteById(id);
  }

  @Post()
  createQuote(@Body() quote: { quote: string; author: string }): Quote {
    return this.quoteService.createQuote(quote);
  }
}
