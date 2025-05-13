import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

interface Quote {
  quote: string;
  author: string;
}

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
}
