import '../styles/globals.css'
import styles from '../styles/App.module.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const login = () => {
    alert("aaaa");
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Otoko
        </h1>
        <div className={styles.header_items}>
          <button className={styles.login_button} onClick={login}>
            ログイン
          </button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
