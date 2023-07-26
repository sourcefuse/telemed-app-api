import { APIGatewayEvent, APIGatewayProxyEvent, Context } from 'aws-lambda';
export * from './application';
export declare function setup(event: APIGatewayEvent, context: Context): Promise<any>;
export declare const handler: (event: APIGatewayProxyEvent, context: Context) => any;
