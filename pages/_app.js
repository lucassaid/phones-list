import '../styles/globals.css'
import { Provider as AlertProvider } from '../components/Alert'

function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider>
      <Component {...pageProps} />
    </AlertProvider>
  )
}

export default MyApp
