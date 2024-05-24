import { Module } from '@nestjs/common';
import { CacheService } from './common/cache/cache.service';
import { SearchModule } from './search/search.module';
import { ConfigProviderModule } from './common/providers/config/config-provider.module';
import { RedisProviderModule } from './common/providers/redis/redis-provider.module';

@Module({
  imports: [ConfigProviderModule, RedisProviderModule, SearchModule],
  controllers: [],
  providers: [CacheService],
})
export class AppModule {}
