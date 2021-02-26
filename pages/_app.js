import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import '../styles/globals.css'
import { Provider as AlertProvider } from '../components/Alert'
import Head from 'next/head'

function App({ Component, pageProps }) {

  const router = useRouter()
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>Lista de números</title>
      </Head>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </>
  )
}

export default App