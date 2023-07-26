"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePageController = void 0;
const tslib_1 = require("tslib");
const openapi_v3_1 = require("@loopback/openapi-v3");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const loopback4_authorization_1 = require("loopback4-authorization");
let HomePageController = class HomePageController {
    constructor(response) {
        var _a;
        this.response = response;
        this.html = fs.readFileSync(path.join(__dirname, '../../public/index.html'), 'utf-8');
        // Replace base path placeholder from env
        this.html = this.html.replace(/\$\{basePath\}/g, (_a = process.env.BASE_PATH) !== null && _a !== void 0 ? _a : '');
    }
    homePage() {
        this.response.status(200 /* STATUS_CODE.OK */).contentType('html').send(this.html);
        return this.response;
    }
};
tslib_1.__decorate([
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, openapi_v3_1.get)('/', {
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Home Page',
                content: { 'text/html': { schema: { type: 'string' } } },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HomePageController.prototype, "homePage", null);
HomePageController = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [Object])
], HomePageController);
exports.HomePageController = HomePageController;
//# sourceMappingURL=home-page.controller.js.map