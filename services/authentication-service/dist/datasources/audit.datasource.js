"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const audit_log_1 = require("@sourceloop/audit-log");
const config = {
    name: 'audit',
    connector: 'postgresql',
    url: '',
    host: '',
    port: 0,
    user: '',
    password: '',
    database: '',
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let AuditDataSource = class AuditDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        const auditEnvConfig = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            schema: process.env.DB_SCHEMA,
        };
        Object.assign(dsConfig, auditEnvConfig);
        super(dsConfig);
    }
};
AuditDataSource.dataSourceName = audit_log_1.AuditDbSourceName;
AuditDataSource.defaultConfig = config;
AuditDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.audit', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], AuditDataSource);
exports.AuditDataSource = AuditDataSource;
//# sourceMappingURL=audit.datasource.js.map