import '@/styles/globals.css'
import axios from "axios"
import { SWRConfig } from "swr";

const swrOptions = {
}

const fetcher = (resource, init) => axios.get(resource, init).then(res => res.data);

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{
      ...swrOptions,
      fetcher,
    }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}
