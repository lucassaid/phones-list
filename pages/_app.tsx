import Head from 'next/head'
import '../styles/globals.css'
import { Provider as AlertProvider } from '../components/Alert'

function MyApp({ Component, pageProps }) {

  return (
    <AlertProvider>
      <Head>
        <meta charSet="utf-8" />
        <title>Lista de números</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <meta name="theme-color" content="#60a5fb" />
      </Head>
      <Component {...pageProps} />
    </AlertProvider>
  )
}

export default MyApp
