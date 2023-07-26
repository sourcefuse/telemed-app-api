"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationServiceApplication = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2022 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const authentication_service_1 = require("@sourceloop/authentication-service");
const core_1 = require("@sourceloop/core");
const loopback4_authentication_1 = require("loopback4-authentication");
const path_1 = tslib_1.__importDefault(require("path"));
const sequence_1 = require("./sequence");
class AuthenticationServiceApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        this.localeObj = {};
        const configObject = {
            locales: [
                "en" /* LocaleKey.en */,
                "es" /* LocaleKey.es */,
                "pt-br" /* LocaleKey.ptBr */,
                "pt-pt" /* LocaleKey.ptPt */,
                "es-co" /* LocaleKey.esCo */,
            ],
            fallbacks: {
                ["es" /* LocaleKey.es */]: 'en',
                ["es-co" /* LocaleKey.esCo */]: 'en',
                ["pt-br" /* LocaleKey.ptBr */]: 'en',
                ["pt-pt" /* LocaleKey.ptPt */]: 'en',
            },
            register: this.localeObj,
            directoryPermissions: '777',
            directory: `/tmp`,
            objectNotation: true,
        };
        this.bind(core_1.SFCoreBindings.config).to({ configObject });
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        this.bind(loopback4_authentication_1.AuthenticationBindings.CONFIG).to({
            secureClient: true,
        });
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.component(authentication_service_1.AuthenticationServiceComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
}
exports.AuthenticationServiceApplication = AuthenticationServiceApplication;
//# sourceMappingURL=application.js.map