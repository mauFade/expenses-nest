import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { createClient } from "redis";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RedisService implements OnModuleDestroy {
  readonly client: ReturnType<typeof createClient>;

  constructor(private configService: ConfigService) {
    this.client = createClient({
      url: this.configService.get<string>("REDIS_URL"),
    });
    this.client.connect();
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, { EX: ttl });
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
