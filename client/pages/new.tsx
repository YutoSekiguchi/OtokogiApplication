import type { NextPage } from 'next'
import Head from 'next/head'
import { PROJECT_NAME } from '../configs/settings';
import styles from "../styles/New.module.css"
import { useState } from 'react';

const New: NextPage = () => {

  const [groupName, setGroupName] = useState<string>('');

  const changeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  }

  return (
    <div className="container">
      <Head>
        <title>新規グループを作成|{PROJECT_NAME}</title>
        <meta name="description" content="会計を漢気じゃんけんで決めるためのアプリケーション" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.form_group}>
          <p className={styles.label}>グループ名</p>
          <input
            type="text"
            className={styles.text_form} 
            placeholder="例）北海道旅行"
            onChange={changeGroupName}
          ></input>
        </div>
      </main>
    </div>
  )
}

export default New;