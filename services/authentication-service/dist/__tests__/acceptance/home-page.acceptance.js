"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http = tslib_1.__importStar(require("http"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const test_helper_1 = require("./test-helper");
describe('HomePage', () => {
    let app;
    let server;
    before('setupApplication', async () => {
        ({ app } = await (0, test_helper_1.setupApplication)());
        server = http.createServer((req, res) => {
            app.requestHandler(req, res);
        });
        process.argv.forEach(argument => console.log(argument)); // NOSONAR
    });
    after(async () => {
        await app.stop();
    });
    it('exposes a default home page', async () => {
        await (0, supertest_1.default)(server)
            .get('/')
            .expect(200 /* STATUS_CODE.OK */)
            .expect('Content-Type', /text\/html/);
    });
    it('exposes self-hosted explorer', async () => {
        await (0, supertest_1.default)(server)
            .get('/explorer/')
            .expect(200 /* STATUS_CODE.OK */)
            .expect('Content-Type', /text\/html/)
            .expect(/<title>LoopBack API Explorer/);
    });
});
//# sourceMappingURL=home-page.acceptance.js.map