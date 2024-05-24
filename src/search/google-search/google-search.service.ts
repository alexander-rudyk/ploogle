import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleSearchService {
  private readonly apiURL = 'https://www.googleapis.com/customsearch/v1';
  private readonly apiKey = this.configService.getOrThrow('GOOGLE_API_KEY');
  private readonly engineId = this.configService.getOrThrow('SEARCH_ENGINE_ID');

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async search(query: string): Promise<any[]> {
    const response = await firstValueFrom(
      this.httpService.get(this.apiURL, {
        params: {
          key: this.apiKey,
          cx: this.engineId,
          q: query,
        },
      }),
    );

    return response.data.items;
  }
}
