"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantRepository = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2022 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const core_2 = require("@sourceloop/core");
const authentication_service_1 = require("@sourceloop/authentication-service");
let TenantRepository = class TenantRepository extends core_2.DefaultSoftCrudRepository {
    constructor(dataSource, tenantConfigRepositoryGetter) {
        super(authentication_service_1.Tenant, dataSource);
        this.tenantConfigRepositoryGetter = tenantConfigRepositoryGetter;
        this.tenantConfigs = this.createHasManyRepositoryFactoryFor('tenantConfigs', tenantConfigRepositoryGetter);
        this.registerInclusionResolver('tenantConfigs', this.tenantConfigs.inclusionResolver);
    }
};
TenantRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(`datasources.${authentication_service_1.AuthDbSourceName}`)),
    tslib_1.__param(1, repository_1.repository.getter('TenantConfigRepository')),
    tslib_1.__metadata("design:paramtypes", [repository_1.juggler.DataSource, Function])
], TenantRepository);
exports.TenantRepository = TenantRepository;
//# sourceMappingURL=tenant.repository.js.map