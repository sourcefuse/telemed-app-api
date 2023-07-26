import { DefaultCrudRepository } from '@loopback/repository';
import { AuditDataSource } from '../datasources';
import { AuditLog } from '../models';
export declare class AuditLogRepository extends DefaultCrudRepository<AuditLog, typeof AuditLog.prototype.id> {
    constructor(dataSource: AuditDataSource);
}
