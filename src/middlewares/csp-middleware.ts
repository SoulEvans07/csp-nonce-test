import { SimpleMiddleware } from "./types";

const trimCspRules = (rules: string): string =>
  rules.replace(/\s{2,}/g, " ").trim();
export const getCspRules = (nonce: string, isDev: boolean): string => {
  const strict = isDev ? "" : `'nonce-${nonce}' 'strict-dynamic'`;

  const tescoHosts = [
    "csp-nonce-test-82ktfusf2-soulevans07.vercel.app",
    "*.tesco.com",
    "*.tesco.ie",
    "*.itesco.cz",
    "*.tesco.hu",
    "*.tesco.sk",
  ];

  const httpsTescoHosts = tescoHosts.map((host) => `https://${host}`);

  return trimCspRules(`
    default-src 'self' ${tescoHosts.join(
      " "
    )} dummyjson.com graphqlzero.almansi.me;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' ${httpsTescoHosts.join(
      " "
    )} ${strict};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: ${httpsTescoHosts.join(" ")};
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    media-src ${httpsTescoHosts.join(" ")};
`);
};

export const generateNonce = (): string =>
  Buffer.from(crypto.randomUUID()).toString("base64");

export const cspMiddleware: SimpleMiddleware = (request, response) => {
  const nonce = generateNonce();
  const isDev = process.env["NODE_ENV"] === "development";
  const cspHeader = getCspRules(nonce, isDev);

  response.headers.set("x-nonce", nonce);
  response.headers.set("Content-Security-Policy", trimCspRules(cspHeader));
  request.headers.set("x-nonce", nonce);
  request.headers.set("Content-Security-Policy", trimCspRules(cspHeader));
  request.headers.set("x-env", `env: ${process.env["NODE_ENV"]}`);
};
