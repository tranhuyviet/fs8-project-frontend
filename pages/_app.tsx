import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

// Redux
import { Provider } from 'react-redux'
import { store } from '../redux/store'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5001/api/v1'
axios.defaults.withCredentials = true

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
