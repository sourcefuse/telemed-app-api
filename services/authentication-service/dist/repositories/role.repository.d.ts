import { juggler } from '@loopback/repository';
import { DefaultSoftCrudRepository } from '@sourceloop/core';
import { Role } from '@sourceloop/authentication-service';
export declare class RoleRepository extends DefaultSoftCrudRepository<Role, typeof Role.prototype.id> {
    constructor(dataSource: juggler.DataSource);
}
