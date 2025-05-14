import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

export type Quote = {
  id: number;
  quote: string;
  author: string;
};

@Injectable()
export class QuoteService implements OnModuleInit {
  private quotes: Quote[] = [];

  async onModuleInit() {
    const filePath = join(process.cwd(), 'src', 'quote', 'quotes.json');
    const fileContent = await readFile(filePath, 'utf-8');
    this.quotes = JSON.parse(fileContent) as Quote[];
  }

  getRandomQuote(): { quote: string; author: string } {
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }

  getQuoteById(id: number): Quote {
    const quote = this.quotes.find((quote) => quote.id === id);

    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    return quote;
  }

  createQuote(quote: { quote: string; author: string }): Quote {
    const newQuote = {
      id: this.quotes.length + 1,
      quote: quote.quote,
      author: quote.author,
    };
    this.quotes.push(newQuote);
    return newQuote;
  }
}
