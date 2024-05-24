import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
import { validateOrReject } from 'class-validator';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() query: SearchDto): Promise<any> {
    await validateOrReject(query);
    return this.searchService.search(query.query);
  }
}
