import { OnModuleDestroy } from "@nestjs/common";
import { createClient } from "redis";
import { ConfigService } from "@nestjs/config";
export declare class RedisService implements OnModuleDestroy {
    private configService;
    readonly client: ReturnType<typeof createClient>;
    constructor(configService: ConfigService);
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
