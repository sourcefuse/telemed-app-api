import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { AuditLog } from '../models';
import { AuditLogRepository } from '../repositories';
export declare class AuditLogsController {
    auditLogRepository: AuditLogRepository;
    constructor(auditLogRepository: AuditLogRepository);
    create(auditLog: Omit<AuditLog, 'id'>): Promise<AuditLog>;
    count(where?: Where<AuditLog>): Promise<Count>;
    find(filter?: Filter<AuditLog>): Promise<AuditLog[]>;
    updateAll(auditLog: AuditLog, where?: Where<AuditLog>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<AuditLog>): Promise<AuditLog>;
    updateById(id: string, auditLog: AuditLog): Promise<void>;
    replaceById(id: string, auditLog: AuditLog): Promise<void>;
    deleteById(id: string): Promise<void>;
}
