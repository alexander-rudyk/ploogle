import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WikipediaService {
  constructor(private readonly httpService: HttpService) {}

  async fetchWikipediaData(url: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.get(url));
    const $ = cheerio.load(response.data);
    const firstParagraph = $('#mw-content-text p').first().text();
    const imageUrl = $('#mw-content-text img').first().attr('src');

    return {
      firstParagraph,
      imageUrl: imageUrl ? `https:${imageUrl}` : null,
    };
  }
}
