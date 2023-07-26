"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApplication = void 0;
const testlab_1 = require("@loopback/testlab");
const __1 = require("../..");
async function setupApplication() {
    const restConfig = (0, testlab_1.givenHttpServerConfig)({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
    });
    setUpEnv();
    const app = new __1.AuthenticationServiceApplication({
        rest: restConfig,
    });
    app.bind('datasources.config.auth').to({
        name: 'auth',
        connector: 'memory',
    });
    app.bind(`datasources.config.${process.env.REDIS_NAME}`).to({
        name: process.env.REDIS_NAME,
        connector: 'kv-memory',
    });
    await app.boot();
    await app.start();
    const client = (0, testlab_1.createRestAppClient)(app);
    return { app, client };
}
exports.setupApplication = setupApplication;
function setUpEnv() {
    process.env.NODE_ENV = 'test';
    process.env.ENABLE_TRACING = '0';
    process.env.ENABLE_OBF = '0';
    process.env.REDIS_NAME = 'redis';
}
//# sourceMappingURL=test-helper.js.map