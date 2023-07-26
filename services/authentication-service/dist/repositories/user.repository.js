"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2022 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const audit_log_1 = require("@sourceloop/audit-log");
const authentication_service_1 = require("@sourceloop/authentication-service");
const core_2 = require("@sourceloop/core");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const loopback4_authentication_1 = require("loopback4-authentication");
const saltRounds = 10;
const userAuditOptions = {
    actionKey: 'User_logs',
};
let UserRepository = class UserRepository extends (0, audit_log_1.AuditRepositoryMixin)(core_2.DefaultSoftCrudRepository, userAuditOptions) {
    constructor(dataSource, getUserCredsRepository, getOtpRepository, tenantRepositoryGetter, userTenantRepositoryGetter, logger, getCurrentUser, getAuditLogRepository) {
        super(authentication_service_1.User, dataSource, getCurrentUser);
        this.dataSource = dataSource;
        this.getUserCredsRepository = getUserCredsRepository;
        this.getOtpRepository = getOtpRepository;
        this.tenantRepositoryGetter = tenantRepositoryGetter;
        this.userTenantRepositoryGetter = userTenantRepositoryGetter;
        this.logger = logger;
        this.getCurrentUser = getCurrentUser;
        this.getAuditLogRepository = getAuditLogRepository;
        this.userTenants = this.createHasManyRepositoryFactoryFor('userTenants', userTenantRepositoryGetter);
        this.registerInclusionResolver('userTenants', this.userTenants.inclusionResolver);
        this.tenant = this.createBelongsToAccessorFor('defaultTenant', tenantRepositoryGetter);
        this.registerInclusionResolver('defaultTenant', this.tenant.inclusionResolver);
        this.credentials = this.createHasOneRepositoryFactoryFor('credentials', getUserCredsRepository);
        this.registerInclusionResolver('credentials', this.credentials.inclusionResolver);
    }
    async create(entity, options) {
        const user = await super.create(entity, options);
        try {
            // Add temporary password for first time
            const password = (await bcrypt.hash(process.env.USER_TEMP_PASSWORD, saltRounds));
            const creds = new authentication_service_1.UserCredentials({
                authProvider: 'internal',
                password,
            });
            await this.credentials(user.id).create(creds);
        }
        catch (err) {
            throw new rest_1.HttpErrors.UnprocessableEntity('Error while hashing password');
        }
        return user;
    }
    async createWithoutPassword(entity, options) {
        return super.create(entity, options);
    }
    async verifyPassword(username, password) {
        const user = await super.findOne({
            where: { username: username.toLowerCase() },
        });
        const creds = user && (await this.credentials(user.id).get());
        if (!user || user.deleted) {
            throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
        }
        else if (!creds ||
            !creds.password ||
            creds.authProvider !== core_2.AuthProvider.INTERNAL ||
            !(await bcrypt.compare(password, creds.password))) {
            this.logger.error('User creds not found in DB or is invalid');
            throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        else {
            return user;
        }
    }
    async updatePassword(username, password, newPassword) {
        const user = await super.findOne({ where: { username } });
        const creds = user && (await this.credentials(user.id).get());
        if (!user || user.deleted || !creds || !creds.password) {
            throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
        }
        else if (creds.authProvider !== core_2.AuthProvider.INTERNAL) {
            throw new rest_1.HttpErrors.BadRequest("PasswordCannotBeChangedForExternalUser" /* AuthenticateErrorKeys.PasswordCannotBeChanged */);
        }
        else if (!(await bcrypt.compare(password, creds.password))) {
            throw new rest_1.HttpErrors.Unauthorized("Incorrect Password" /* AuthErrorKeys.WrongPassword */);
        }
        else if (await bcrypt.compare(newPassword, creds.password)) {
            throw new rest_1.HttpErrors.Unauthorized('Password cannot be same as previous password!');
        }
        else {
            // Do nothing
        }
        await this.credentials(user.id).patch({
            password: await bcrypt.hash(newPassword, saltRounds),
        });
        return user;
    }
    async changePassword(username, newPassword, oldPassword) {
        const user = await super.findOne({ where: { username } });
        const creds = user && (await this.credentials(user.id).get());
        if (oldPassword) {
            // This method considers old password as OTP
            const otp = await (await this.getOtpRepository()).get(username);
            if (!otp || otp.otp !== oldPassword) {
                throw new rest_1.HttpErrors.Unauthorized("Incorrect Password" /* AuthErrorKeys.WrongPassword */);
            }
        }
        if ((creds === null || creds === void 0 ? void 0 : creds.authProvider) !== core_2.AuthProvider.INTERNAL) {
            throw new rest_1.HttpErrors.Unauthorized("PasswordCannotBeChangedForExternalUser" /* AuthenticateErrorKeys.PasswordCannotBeChanged */);
        }
        if (!user || user.deleted || !creds || !creds.password) {
            throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
        }
        else if (await bcrypt.compare(newPassword, creds.password)) {
            throw new rest_1.HttpErrors.Unauthorized('Password cannot be same as previous password!');
        }
        else {
            // DO nothing
        }
        await this.credentials(user.id).patch({
            password: await bcrypt.hash(newPassword, saltRounds),
        });
        return user;
    }
    async updateLastLogin(userId) {
        await super.updateById(userId, {
            lastLogin: Date.now(),
        }, {
            currentUser: { id: userId },
        });
    }
    async firstTimeUser(userId) {
        const user = await super.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new rest_1.HttpErrors.NotFound("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
        }
        const userTenant = await (await this.userTenantRepositoryGetter()).findOne({
            where: {
                userId,
                tenantId: user.defaultTenantId,
                status: {
                    inq: [0 /* UserStatus.REGISTERED */, 3 /* UserStatus.PASSWORD_CHANGE_NEEDED */],
                },
            },
        });
        return !!userTenant;
    }
};
UserRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(`datasources.${authentication_service_1.AuthDbSourceName}`)),
    tslib_1.__param(1, repository_1.repository.getter(authentication_service_1.UserCredentialsRepository)),
    tslib_1.__param(2, repository_1.repository.getter(authentication_service_1.OtpRepository)),
    tslib_1.__param(3, repository_1.repository.getter('TenantRepository')),
    tslib_1.__param(4, repository_1.repository.getter('UserTenantRepository')),
    tslib_1.__param(5, (0, core_1.inject)(core_2.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(6, core_1.inject.getter(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__param(7, repository_1.repository.getter('AuditLogRepository')),
    tslib_1.__metadata("design:paramtypes", [repository_1.juggler.DataSource, Function, Function, Function, Function, Object, Function, Function])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map