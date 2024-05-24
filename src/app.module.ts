import { Module } from '@nestjs/common';
import { CacheService } from './common/cache/cache.service';
import { SearchModule } from './search/search.module';

@Module({
  imports: [SearchModule],
  controllers: [],
  providers: [CacheService],
})
export class AppModule {}
