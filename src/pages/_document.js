import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en" data-theme="dark">
        <Head>
          {/* Google uses these (especially /favicon.ico and rel=icon). Replace files in /public with your Meksova mark. */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
                    <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.json" />
          {/* Theme before first paint (dark unless the visitor chose light), and
              a flag so scroll-reveal only hides content when JS is running. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var d=document.documentElement;try{var t=localStorage.getItem('meksova-theme');d.dataset.theme=t==='light'?'light':'dark'}catch(e){d.dataset.theme='dark'}d.classList.add('ks-js')})();`,
            }}
          />
          <meta name="theme-color" content="#050608" />
          {/* Google tag (gtag.js) */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-18245722845"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-18245722845');
              `,
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
