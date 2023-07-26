"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getRefreshToken = exports.requestToken = exports.loginToAPI = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
dotenv_1.default.config({
    path: __dirname + '/./../../../.env',
});
const BASE_URL = process.env.LAMBDA_URL;
async function loginToAPI(reqData) {
    process.env.JWT_ISSUER = 'sourcefuse';
    return (0, supertest_1.default)(BASE_URL).post(`/auth/login`).send(reqData);
}
exports.loginToAPI = loginToAPI;
async function requestToken(code) {
    const useragent = 'test';
    const deviceId = 'test';
    const useragentName = 'user-agent';
    const deviceIdName = 'device_id';
    return (0, supertest_1.default)(BASE_URL)
        .post(`/auth/token`)
        .set(deviceIdName, deviceId)
        .set(useragentName, useragent)
        .send({
        clientId: 'webapp',
        code: code,
    });
}
exports.requestToken = requestToken;
async function getRefreshToken(accessToken, refreshToken) {
    return (0, supertest_1.default)(BASE_URL)
        .post(`/auth/token-refresh`)
        .send({ refreshToken: refreshToken })
        .set('Authorization', `Bearer ${accessToken}`);
}
exports.getRefreshToken = getRefreshToken;
async function changePassword(accessToken, reqData) {
    return (0, supertest_1.default)(BASE_URL)
        .patch('/auth/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(reqData);
}
exports.changePassword = changePassword;
//# sourceMappingURL=utils.js.map