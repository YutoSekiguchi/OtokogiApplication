import styles from '../styles/App.module.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/common/Header'
import Head from 'next/head'

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <noscript id="__next_css__DO_NOT_USE__" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} Yuto Sekiguchi</p>
      </footer>
    </SessionProvider>
  );
}

export default MyApp
