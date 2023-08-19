import '../styles/globals.css'
import styles from '../styles/App.module.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/common/Header'

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} Yuto Sekiguchi</p>
      </footer>
    </SessionProvider>
  );
}

export default MyApp
