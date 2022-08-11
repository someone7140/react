import Document, { Head, Main, NextScript } from "next/document";
import { existsGaId, GA_ID } from "../services/common/GtagService";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    function getTilte() {
      return process.env.DEVELOP_MODE === "true" ? "Coda(開発環境)" : "Coda";
    }

    return (
      <html>
        <Head>
          <title>{getTilte()}</title>
          <meta http-equiv="Cache-Control" content="no-cache"></meta>
          <link rel="shortcut icon" href="/favicon.png"></link>
          {/* Google Analytics */}
          {existsGaId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
              />
            </>
          )}
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
