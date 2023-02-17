import DeferNextScript from "@/utils/deferNextScript"
import Document, { Html, Head, Main } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <meta name="description" content="Lihat progress belajarmu disini" />
        </Head>
        <body>
          <Main />
          <DeferNextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
