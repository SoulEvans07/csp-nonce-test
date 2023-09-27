import { NextRequest, NextResponse } from 'next/server';
import { defaultMiddlewares } from './middlewares/default-middlewares';
import { stackMiddlewares } from './middlewares/stack-middlewares';
import { SimpleMiddleware } from './middlewares/types';

const middlewares: SimpleMiddleware[] = [...defaultMiddlewares];

export const config = {
  matcher: [
    {
      // source: '/((?!_next/static|_next/image|favicon.ico).*)',
      source: '/((?!_next/image|favicon.ico).*)',
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

  return stackMiddlewares(request, response, middlewares);
}
