import { Injectable } from '@nestjs/common';

@Injectable()
export class QuoteService {
  private quotes = [
    "행동 없는 믿음은 죽은것이다. - 야고보",
    "고통은 일시적이지만 포기는 영원하다. - 랜스 암스트롱",
    "무너지기 직전이 가장 강해질 타이밍이다. - 기가채드",
    "성공은 준비된 자의 기회다. - 세네카",
    "움직이는 한 너는 쓰러지지 않는다. - 기가채드"
  ];

  getRandomQuote(): string {
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }
}
