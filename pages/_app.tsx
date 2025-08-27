import type { AppProps } from "next/app"
import Head from "next/head"
import "../styles/globals.css"
import Layout from "@components/layout"

const title = "Vivian's Library"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="A site to search library books" content="Vivian's Books" />
        <link rel="icon" href="/images/rainbows/rainbow-blue-svgrepo-com.svg" />
      </Head>
      <Layout>
        <main className="h-full">
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  )
}

export default MyApp
