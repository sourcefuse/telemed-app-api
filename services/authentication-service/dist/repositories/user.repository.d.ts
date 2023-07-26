import { Getter, Constructor } from '@loopback/core';
import { BelongsToAccessor, DataObject, HasManyRepositoryFactory, HasOneRepositoryFactory, juggler, Options } from '@loopback/repository';
import { AuditLogRepository } from '@sourceloop/audit-log';
import { OtpRepository, Tenant, TenantRepository, User, UserCredentials, UserCredentialsRepository, UserRelations, UserTenant, UserTenantRepository } from '@sourceloop/authentication-service';
import { DefaultSoftCrudRepository, IAuthUserWithPermissions, ILogger } from '@sourceloop/core';
declare const UserRepository_base: Constructor<DefaultSoftCrudRepository<User, string | undefined, UserRelations>> & Constructor<import("@sourceloop/audit-log").IAuditMixin<string>>;
export declare class UserRepository extends UserRepository_base {
    dataSource: juggler.DataSource;
    getUserCredsRepository: Getter<UserCredentialsRepository>;
    getOtpRepository: Getter<OtpRepository>;
    protected tenantRepositoryGetter: Getter<TenantRepository>;
    protected userTenantRepositoryGetter: Getter<UserTenantRepository>;
    private readonly logger;
    getCurrentUser: Getter<IAuthUserWithPermissions>;
    getAuditLogRepository: Getter<AuditLogRepository>;
    readonly credentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;
    readonly tenant: BelongsToAccessor<Tenant, typeof User.prototype.id>;
    readonly userTenants: HasManyRepositoryFactory<UserTenant, typeof User.prototype.id>;
    constructor(dataSource: juggler.DataSource, getUserCredsRepository: Getter<UserCredentialsRepository>, getOtpRepository: Getter<OtpRepository>, tenantRepositoryGetter: Getter<TenantRepository>, userTenantRepositoryGetter: Getter<UserTenantRepository>, logger: ILogger, getCurrentUser: Getter<IAuthUserWithPermissions>, getAuditLogRepository: Getter<AuditLogRepository>);
    create(entity: DataObject<User>, options?: Options): Promise<User>;
    createWithoutPassword(entity: DataObject<User>, options?: Options): Promise<User>;
    verifyPassword(username: string, password: string): Promise<User>;
    updatePassword(username: string, password: string, newPassword: string): Promise<User>;
    changePassword(username: string, newPassword: string, oldPassword?: string): Promise<User>;
    updateLastLogin(userId: string): Promise<void>;
    firstTimeUser(userId: string): Promise<boolean>;
}
export {};
