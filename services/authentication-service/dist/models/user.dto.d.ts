import { Model } from '@loopback/repository-json-schema';
import { UserStatus } from '@sourceloop/core';
export declare class UserDto extends Model {
    roleId: string;
    tenantId: string;
    userTenantId: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    status?: UserStatus;
    firstName: string;
    lastName: string;
    clientId: string;
    constructor(data?: Partial<UserDto>);
}
