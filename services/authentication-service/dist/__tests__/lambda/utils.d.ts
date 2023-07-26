/// <reference types="superagent" />
export declare function loginToAPI(reqData: object): Promise<import("superagent").Response>;
export declare function requestToken(code: string): Promise<import("superagent").Response>;
export declare function getRefreshToken(accessToken: string | null, refreshToken: string): Promise<import("superagent").Response>;
export declare function changePassword(accessToken: string, reqData: object): Promise<import("superagent").Response>;
