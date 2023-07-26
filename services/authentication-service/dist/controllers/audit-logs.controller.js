"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const base = '/audit-logs';
let AuditLogsController = class AuditLogsController {
    constructor(auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }
    async create(auditLog) {
        return this.auditLogRepository.create(auditLog);
    }
    async count(where) {
        return this.auditLogRepository.count(where);
    }
    async find(filter) {
        return this.auditLogRepository.find(filter);
    }
    async updateAll(auditLog, where) {
        return this.auditLogRepository.updateAll(auditLog, where);
    }
    async findById(id, filter) {
        return this.auditLogRepository.findById(id, filter);
    }
    async updateById(id, auditLog) {
        await this.auditLogRepository.updateById(id, auditLog);
    }
    async replaceById(id, auditLog) {
        await this.auditLogRepository.replaceById(id, auditLog);
    }
    async deleteById(id) {
        await this.auditLogRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)(base),
    (0, rest_1.response)(200 /* STATUS_CODE.OK */, {
        description: 'AuditLog model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.AuditLog) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.AuditLog, {
                    title: 'NewAuditLog',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuditLogsController.prototype, "create", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.get)(`${base}/count`),
    (0, rest_1.response)(200 /* STATUS_CODE.OK */, {
        description: 'AuditLog model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.AuditLog)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuditLogsController.prototype, "count", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.get)(base),
    (0, rest_1.response)(200 /* STATUS_CODE.OK */, {
        description: 'Array of AuditLog model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.AuditLog, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.AuditLog)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuditLogsController.prototype, "find", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.patch)(base),
    (0, rest_1.response)(200 /* STATUS_CODE.OK */, {
        description: 'AuditLog PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.AuditLog, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.AuditLog)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.AuditLog, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuditLogsController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.get)(`${base}/{id}`),
    (0, rest_1.response)(200 /* STATUS_CODE.OK */, {
        description: 'AuditLog model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.AuditLog, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.AuditLog, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuditLogsController.prototype, "findById", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.patch)(`${base}/{id}`),
    (0, rest_1.response)(204 /* STATUS_CODE.NO_CONTENT */, {
        description: 'AuditLog PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.AuditLog, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.AuditLog]),
    tslib_1.__metadata("design:returntype", Promise)
], AuditLogsController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.put)(`${base}/{id}`),
    (0, rest_1.response)(204 /* STATUS_CODE.NO_CONTENT */, {
        description: 'AuditLog PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.AuditLog]),
    tslib_1.__metadata("design:returntype", Promise)
], AuditLogsController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.del)(`${base}/{id}`),
    (0, rest_1.response)(204 /* STATUS_CODE.NO_CONTENT */, {
        description: 'AuditLog DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuditLogsController.prototype, "deleteById", null);
AuditLogsController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.AuditLogRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.AuditLogRepository])
], AuditLogsController);
exports.AuditLogsController = AuditLogsController;
//# sourceMappingURL=audit-logs.controller.js.map