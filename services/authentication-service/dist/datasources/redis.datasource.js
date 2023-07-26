"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const fs_1 = require("fs");
const authentication_service_1 = require("@sourceloop/authentication-service");
const config = {
    name: process.env.REDIS_NAME,
    connector: 'kv-memory',
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DATABASE,
    url: process.env.REDIS_URL,
    tls: +process.env.REDIS_TLS_ENABLED && process.env.REDIS_TLS_CERT
        ? {
            ca: (0, fs_1.readFileSync)(process.env.REDIS_TLS_CERT),
        }
        : undefined,
    sentinels: +process.env.REDIS_HAS_SENTINELS && process.env.REDIS_SENTINELS
        ? JSON.parse(process.env.REDIS_SENTINELS)
        : undefined,
    sentinelPassword: +process.env.REDIS_HAS_SENTINELS && process.env.REDIS_SENTINEL_PASSWORD
        ? process.env.REDIS_SENTINEL_PASSWORD
        : undefined,
    role: +process.env.REDIS_HAS_SENTINELS && process.env.REDIS_SENTINEL_ROLE
        ? process.env.REDIS_SENTINEL_ROLE
        : undefined,
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let RedisDataSource = class RedisDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        if (+process.env.REDIS_HAS_SENTINELS &&
            !!process.env.REDIS_SENTINEL_HOST &&
            !!process.env.REDIS_SENTINEL_PORT) {
            dsConfig.sentinels = [
                {
                    host: process.env.REDIS_SENTINEL_HOST,
                    port: +process.env.REDIS_SENTINEL_PORT,
                },
            ];
        }
        super(dsConfig);
    }
};
RedisDataSource.dataSourceName = authentication_service_1.AuthCacheSourceName;
RedisDataSource.defaultConfig = config;
RedisDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)(`datasources.config.${process.env.REDIS_NAME}`, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], RedisDataSource);
exports.RedisDataSource = RedisDataSource;
//# sourceMappingURL=redis.datasource.js.map