import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { QuoteService, QuoteDto } from './quote.service';

@Controller('quote')
export class QuoteController {
  private readonly logger = new Logger(QuoteController.name);
  constructor(private readonly quoteService: QuoteService) {}

  // CREATE
  @Post()
  async createQuote(@Body() quote: QuoteDto) {
    const createQuote = await this.quoteService.createQuote(quote);
    this.logger.log('Quote Created. id: ' + createQuote.id);

    return createQuote;
  }

  // READ
  @Get()
  async getQuotes() {
    const quotes = await this.quoteService.findAll();
    this.logger.log('Quotes Found. Count: ' + quotes.length);

    return quotes;
  }

  @Get('random')
  async getRandomQuote() {
    const quotes = await this.quoteService.findAll();
    if (quotes.length === 0) {
      this.logger.error('No quotes found for random selection');
      throw new NotFoundException('No quotes available');
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    this.logger.log('Random Quote Retrieved. id: ' + randomQuote.id);
    return randomQuote;
  }

  @Get(':id')
  async getQuoteById(@Param('id') id: number) {
    const quote = await this.quoteService.findOne(id);
    if (!quote) {
      this.logger.error('Quote Not Found. id: ' + id);
      throw new NotFoundException('Quote Not Found');
    }
    this.logger.log('Quote Found. id: ' + id);

    return quote;
  }

  // UPDATE
  @Put(':id')
  async updateQuote(@Param('id') id: number, @Body() quote: QuoteDto) {
    const updateQuote = await this.quoteService.updateQuote(id, quote);
    this.logger.log('Quote Updated. id: ' + id);

    return updateQuote;
  }

  // DELETE
  @Delete(':id')
  async deleteQuote(@Param('id') id: number) {
    await this.quoteService.deleteQuote(id);
    this.logger.log('Quote Deleted. id: ' + id);
  }
}
