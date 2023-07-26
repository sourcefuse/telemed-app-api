/// <reference types="node" />
import { LifeCycleObserver } from '@loopback/core';
import { AnyObject, juggler } from '@loopback/repository';
export declare class RedisDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string | undefined;
        connector: string;
        host: string | undefined;
        port: string | undefined;
        password: string | undefined;
        db: string | undefined;
        url: string | undefined;
        tls: {
            ca: Buffer;
        } | undefined;
        sentinels: any;
        sentinelPassword: string | undefined;
        role: string | undefined;
    };
    constructor(dsConfig?: AnyObject);
}
