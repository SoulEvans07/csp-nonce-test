import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { generateNonce, getCspRules } from "../middlewares/csp-middleware";

export class CustomDocument extends Document<{ nonce: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const nonce = generateNonce();
    const cspHeader = getCspRules(nonce, false);
    const docProps = await ctx.defaultGetInitialProps(ctx, { nonce });

    if (ctx.res === undefined) console.log("ctx undefined");
    ctx.res?.setHeader("Content-Security-Policy", cspHeader);
    return { ...docProps, nonce };
  }

  render() {
    const { nonce } = this.props;

    return (
      <Html nonce={nonce}>
        <Head nonce={nonce} />
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
