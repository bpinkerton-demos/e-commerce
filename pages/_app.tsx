import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react";
import AppNavbar from "../components/AppNavbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
          <AppNavbar />
          <Component {...pageProps} />
      </SessionProvider>
  )


}

export default MyApp
