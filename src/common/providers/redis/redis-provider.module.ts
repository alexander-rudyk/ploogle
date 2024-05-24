import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'single',
          options: {
            host: configService.get('REDIS_HOST'),
            port: +configService.get('REDIS_PORT'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class RedisProviderModule {}
