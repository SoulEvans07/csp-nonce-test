import { NextRequest, NextResponse } from 'next/server';
import { SimpleMiddleware } from './types';

export function stackMiddlewares(
  request: NextRequest,
  response: NextResponse,
  middlewares: SimpleMiddleware[],
) {
  for (const middleware of middlewares) {
    const early = middleware(request, response);
    if (early) return early;
  }

  return response;
}
