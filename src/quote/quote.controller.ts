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
import { Quote } from './entity/quote.entity';
import { CreateQuoteDto } from './dto/quote/create-quote.dto';

@Controller('quote')
export class QuoteController {
  private readonly logger = new Logger(QuoteController.name);
  constructor(private readonly quoteService: QuoteService) {}

  // CREATE
  @Post()
  async createQuote(@Body() quoteDto: CreateQuoteDto): Promise<Quote> {
    const createdQuote = await this.quoteService.createQuote(quoteDto);
    this.logger.log('Quote Created. id: ' + createdQuote.id);
    return createdQuote;
  }

  // READ
  @Get()
  async getQuotes(): Promise<Quote[]> {
    const quotes = await this.quoteService.findAll();
    this.logger.log('Quotes Found. Count: ' + quotes.length);
    return quotes;
  }

  @Get('random')
  async getRandomQuote(): Promise<Quote> {
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
  async getQuoteById(@Param('id') id: number): Promise<Quote> {
    const quote = await this.quoteService.findOne(id);
    if (!quote) {
      this.logger.error('Quote Not Found. id: ' + id);
      throw new NotFoundException('Quote Not Found');
    }
    this.logger.log('Quote Found. id: ' + quote.id);
    return quote;
  }

  // UPDATE
  @Put(':id')
  async updateQuote(
    @Param('id') id: number,
    @Body() quoteDto: QuoteDto,
  ): Promise<Quote> {
    const updatedQuote = await this.quoteService.updateQuote(id, quoteDto);
    this.logger.log('Quote Updated. id: ' + updatedQuote.id);
    return updatedQuote;
  }

  // DELETE
  @Delete(':id')
  async deleteQuote(@Param('id') id: number): Promise<void> {
    await this.quoteService.deleteQuote(id);
    this.logger.log('Quote Deleted. id: ' + id);
  }
}
