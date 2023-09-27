import { NextRequest, NextResponse } from 'next/server';
import { stackMiddlewares } from './middlewares/stack-middlewares';
import { SimpleMiddleware } from './middlewares/types';
import { cspMiddleware } from './middlewares/csp-middleware';

const middlewares: SimpleMiddleware[] = [];

export const config = {
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      // source: '/((?!_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();
  console.log(request.url);
  
  response.headers.set("x-env", `env: ${process.env["NODE_ENV"]}`);

  return stackMiddlewares(request, response, middlewares);
}
