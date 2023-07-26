"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.setup = void 0;
const tslib_1 = require("tslib");
const application_1 = require("./application");
const serverlessExpress = require('@vendia/serverless-express');
tslib_1.__exportStar(require("./application"), exports);
let serverlessApp; // NOSONAR
async function setup(event, context) {
    const config = {
        rest: {
            openApiSpec: {
                setServersFromRequest: true,
            },
        },
    };
    const app = new application_1.AuthenticationServiceApplication(config);
    await app.boot();
    const requestHandler = app.restServer.requestHandler;
    serverlessApp = serverlessExpress({ app: requestHandler });
    return serverlessApp(event, context);
}
exports.setup = setup;
const handler = (event, context) => {
    if (serverlessApp) {
        return serverlessApp(event, context);
    }
    return setup(event, context);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map