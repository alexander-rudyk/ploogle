import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService {
  private pendingRequests: Map<string, Promise<any>> = new Map();

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(key: string): Promise<any> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  addPendingRequest(key: string, promise: Promise<any>) {
    this.pendingRequests.set(key, promise);
  }

  getPendingRequest(key: string): Promise<any> | undefined {
    return this.pendingRequests.get(key);
  }

  removePendingRequest(key: string) {
    this.pendingRequests.delete(key);
  }
}
