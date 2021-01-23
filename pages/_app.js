import Head from 'next/head'
import '../styles/globals.css'
import { Provider as AlertProvider } from '../components/Alert'

function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Lista de números</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/list.svg"
          rel="icon"
          sizes="16x16"
        />
        <link
          href="/icons/list.svg"
          rel="icon"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#60a5fb" />
      </Head>
      <Component {...pageProps} />
    </AlertProvider>
  )
}

export default MyApp
