import type { NextRequest, NextResponse } from 'next/server';

export type SimpleMiddleware = (req: NextRequest, res: NextResponse) => void | NextResponse;
