import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { RecoilPersist, updateState } = recoilPersist()

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot initializeState={updateState}>
      <RecoilPersist />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
