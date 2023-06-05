import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
}

const middleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const after: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        if (request.event.httpMethod === 'OPTIONS') {
            request.response = {
                statusCode: 200,
                headers: CORS_HEADERS,
                body: '{}'
            }

        }

        if (request.response) {
            request.response.headers = CORS_HEADERS;
        }
    }

    return {
        before: after,
        onError: after,
        after,
    }
}

export default middleware