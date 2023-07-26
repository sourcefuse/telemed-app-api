import { Client } from '@loopback/testlab';
import { AuthenticationServiceApplication } from '../..';
export declare function setupApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    app: AuthenticationServiceApplication;
    client: Client;
}
