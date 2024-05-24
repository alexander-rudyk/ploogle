import { Injectable } from '@nestjs/common';
import { GoogleSearchService } from './google-search/google-search.service';
import { WikipediaService } from './wikipedia/wikipedia.service';
import { CacheService } from 'src/common/cache/cache.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SearchService {
  constructor(
    private readonly googleSearchService: GoogleSearchService,
    private readonly wikipediaService: WikipediaService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {}

  async search(query: string): Promise<any> {
    const cachedResult = await this.cacheService.get(query);
    if (cachedResult) return cachedResult;

    const ongoingRequest = this.cacheService.getPendingRequest(query);
    if (ongoingRequest) return ongoingRequest;

    const searchPromise = this.executeSearch(query);

    this.cacheService.addPendingRequest(query, searchPromise);

    const result = await searchPromise;

    this.cacheService.removePendingRequest(query);
    await this.cacheService.set(query, result, 600);

    return result;
  }

  private async executeSearch(query: string): Promise<any> {
    const googleResults = await this.googleSearchService.search(query);
    let response;

    const wikiResult = googleResults.find((result) =>
      result.link.includes('wikipedia.org'),
    );
    if (wikiResult) {
      const wikiData = await this.wikipediaService.fetchWikipediaData(
        wikiResult.link,
      );
      response = {
        title: wikiResult.title,
        description: wikiData.firstParagraph,
        image: wikiData.imageUrl,
      };
    } else {
      response = googleResults.slice(0, 10).map((result) => ({
        title: result.title,
        description: result.snippet,
        link: result.link,
        image: result.pagemap?.cse_image?.[0]?.src || null,
        icon: result.pagemap?.cse_thumbnail?.[0]?.src || null,
      }));
    }

    // Simulate slow service
    if (!!this.configService.get('SLOW_MODE')) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    return response;
  }
}
