import '../styles/globals.css'
import styles from '../styles/App.module.css'
import type { AppProps } from 'next/app'
import { PROJECT_NAME } from '../configs/settings';

function MyApp({ Component, pageProps }: AppProps) {
  const login = () => {
    alert("aaaa");
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {PROJECT_NAME}
        </h1>
        <div className={styles.header_items}>
          <button className={styles.login_button} onClick={login}>
            ログイン
          </button>
        </div>
      </header>
      <Component {...pageProps} />
      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} Yuto Sekiguchi</p>
      </footer>
    </>
  );
}

export default MyApp
