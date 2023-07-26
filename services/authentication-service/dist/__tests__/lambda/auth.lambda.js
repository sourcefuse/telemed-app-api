"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// /* eslint-disable @typescript-eslint/naming-convention */
const testlab_1 = require("@loopback/testlab");
const mocha_1 = require("mocha");
const utils_1 = require("./utils");
const username = 'platform.admin@yopmail.com';
const password = 'test123!@#'; //NOSONAR
const newPassword = 'new_test123!@#';
(0, mocha_1.describe)('Authentication microservice', () => {
    (0, mocha_1.it)('should give status 422 for login request with no client credentials', async () => {
        const reqData = {};
        const response = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(response.status).to.equal(422 /* STATUS_CODE.UNPROCESSED_ENTITY */);
        (0, testlab_1.expect)(response).to.have.property('error');
    });
    (0, mocha_1.it)('should give status 422 for login request with no user credentials', async () => {
        const reqData = {
            clientId: 'webapp',
        };
        const response = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(response.status).to.equal(422 /* STATUS_CODE.UNPROCESSED_ENTITY */);
        (0, testlab_1.expect)(response).to.have.property('error');
    });
    (0, mocha_1.it)('should give status 401 for login request with wrong client credentials', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'web1',
            username: 'someuser',
            password: 'somepassword', //NOSONAR
        };
        const response = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(response.status).to.equal(401 /* STATUS_CODE.UNAUTHORISED */);
        (0, testlab_1.expect)(response).to.have.property('error');
    });
    (0, mocha_1.it)('should give status 401 for login request with wrong user credentials', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username: 'someuser',
            password: 'somepassword', //NOSONAR
        };
        const response = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(response.status).to.equal(401 /* STATUS_CODE.UNAUTHORISED */);
        (0, testlab_1.expect)(response).to.have.property('error');
    });
    (0, mocha_1.it)('should give status 200 for login request', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username,
            password,
        };
        const response = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(response.status).to.equal(200 /* STATUS_CODE.OK */);
    });
    (0, mocha_1.it)('should return code in response', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username,
            password,
        };
        const reqForCode = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(reqForCode.status).to.equal(200 /* STATUS_CODE.OK */);
        (0, testlab_1.expect)(reqForCode.body).to.have.property('code');
    });
    (0, mocha_1.it)('should return refresh token, access token, expires in response', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username,
            password,
        };
        const reqForCode = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(reqForCode.status).to.equal(200 /* STATUS_CODE.OK */);
        const response = await (0, utils_1.requestToken)(reqForCode.body.code);
        (0, testlab_1.expect)(response.body).to.have.properties([
            'accessToken',
            'refreshToken',
            'expires',
        ]);
    });
    (0, mocha_1.it)('should return refresh token and access token for token refresh request', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username,
            password,
        };
        const reqForCode = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(reqForCode.status).to.equal(200 /* STATUS_CODE.OK */);
        const reqForToken = await (0, utils_1.requestToken)(reqForCode.body.code);
        const response = await (0, utils_1.getRefreshToken)(reqForToken.body.accessToken, reqForToken.body.refreshToken);
        (0, testlab_1.expect)(response.body).to.have.properties(['accessToken', 'refreshToken']);
    });
    (0, mocha_1.it)('should throw error when login for external user', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username: 'platform.admin@mail.com',
            password,
        };
        const reqForCode = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(reqForCode.status).to.equal(401 /* STATUS_CODE.UNAUTHORISED */);
        (0, testlab_1.expect)(reqForCode.body.error.message.message).to.equal("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
    });
    (0, mocha_1.it)('should change password successfully for internal user', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username,
            password,
        };
        const reqForCode = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(reqForCode.status).to.equal(200 /* STATUS_CODE.OK */);
        const reqForToken = await (0, utils_1.requestToken)(reqForCode.body.code);
        const accessToken = reqForToken.body.accessToken;
        const response = await (0, utils_1.changePassword)(accessToken, {
            username,
            password: newPassword,
            refreshToken: reqForToken.body.refreshToken,
        });
        (0, testlab_1.expect)(response.status).to.equal(200 /* STATUS_CODE.OK */);
    });
    (0, mocha_1.it)('should return refresh token and access token for token refresh request with new password', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username,
            password: newPassword,
        };
        const reqForCode = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(reqForCode.status).to.equal(200 /* STATUS_CODE.OK */);
        const reqForToken = await (0, utils_1.requestToken)(reqForCode.body.code);
        const response = await (0, utils_1.getRefreshToken)(reqForToken.body.accessToken, reqForToken.body.refreshToken);
        (0, testlab_1.expect)(response.body).to.have.properties(['accessToken', 'refreshToken']);
    });
    (0, mocha_1.it)('should revert to previous password successfully for internal user', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username,
            password: newPassword,
        };
        const reqForCode = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(reqForCode.status).to.equal(200 /* STATUS_CODE.OK */);
        const reqForToken = await (0, utils_1.requestToken)(reqForCode.body.code);
        const accessToken = reqForToken.body.accessToken;
        const response = await (0, utils_1.changePassword)(accessToken, {
            username,
            password,
            refreshToken: reqForToken.body.refreshToken,
        });
        (0, testlab_1.expect)(response.status).to.equal(200 /* STATUS_CODE.OK */);
    });
    (0, mocha_1.it)('should return 401 for token refresh request when Authentication token invalid', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username,
            password,
        };
        const reqForCode = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(reqForCode.status).to.equal(200 /* STATUS_CODE.OK */);
        const reqForToken = await (0, utils_1.requestToken)(reqForCode.body.code);
        const response = await (0, utils_1.getRefreshToken)('abc', reqForToken.body.refreshToken);
        (0, testlab_1.expect)(response.status).to.equal(401 /* STATUS_CODE.UNAUTHORISED */);
    });
    (0, mocha_1.it)('should return 401 for token refresh request when Authentication token missing', async () => {
        const reqData = {
            // eslint-disable-next-line
            client_id: 'webapp',
            username,
            password,
        };
        const reqForCode = await (0, utils_1.loginToAPI)(reqData);
        (0, testlab_1.expect)(reqForCode.status).to.equal(200 /* STATUS_CODE.OK */);
        const reqForToken = await (0, utils_1.requestToken)(reqForCode.body.code);
        const response = await (0, utils_1.getRefreshToken)(null, reqForToken.body.refreshToken);
        (0, testlab_1.expect)(response.status).to.equal(401 /* STATUS_CODE.UNAUTHORISED */);
    });
});
//# sourceMappingURL=auth.lambda.js.map