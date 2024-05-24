import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { GoogleSearchService } from './google-search/google-search.service';
import { WikipediaService } from './wikipedia/wikipedia.service';
import { HttpModule } from '@nestjs/axios';
import { CacheService } from 'src/common/cache/cache.service';

@Module({
  imports: [HttpModule],
  providers: [
    SearchService,
    GoogleSearchService,
    WikipediaService,
    CacheService,
  ],
  controllers: [SearchController],
})
export class SearchModule {}
