import { Getter } from '@loopback/core';
import { HasManyRepositoryFactory, juggler } from '@loopback/repository';
import { DefaultSoftCrudRepository } from '@sourceloop/core';
import { Tenant, TenantConfig, TenantConfigRepository } from '@sourceloop/authentication-service';
export declare class TenantRepository extends DefaultSoftCrudRepository<Tenant, typeof Tenant.prototype.id> {
    protected tenantConfigRepositoryGetter: Getter<TenantConfigRepository>;
    readonly tenantConfigs: HasManyRepositoryFactory<TenantConfig, typeof Tenant.prototype.id>;
    constructor(dataSource: juggler.DataSource, tenantConfigRepositoryGetter: Getter<TenantConfigRepository>);
}
