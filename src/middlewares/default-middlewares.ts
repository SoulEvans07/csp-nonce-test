import { SimpleMiddleware } from './types';
import { cspMiddleware } from './csp-middleware';

export const defaultMiddlewares: SimpleMiddleware[] = [cspMiddleware];
