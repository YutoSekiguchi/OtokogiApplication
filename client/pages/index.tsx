import type { NextPage } from 'next'
import Head from 'next/head'
import { PROJECT_NAME } from '../configs/settings'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import styles from '../styles/Home.module.css'
import { useUserStore } from '../stores/user'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import { getRecordsByUID } from '../services/record'
import { RecordDataType } from '../@types/record'
import { useMemberStore } from '../stores/member'
import { useRecordStore } from '../stores/record'

const Home: NextPage = () => {

  const user = useUserStore((state) => state.user);
  const resetMembers = useMemberStore((state) => state.resetMembers);
  const resetRecordData = useRecordStore((state) => state.resetRecordData)

  const router = useRouter();
  const [recordData, setRecordData] = useState<RecordDataType[]>([]);
  const moveNewPage = () => {
    router.push("/new");
  }

  const resetData = () => {
    resetRecordData();
    resetMembers();
  }

  useEffect(() => {
    resetData();
    const getRecordData = async() => {
      if (user !== null) {
        const res = await getRecordsByUID(user.id);
        setRecordData(res);
      }
    }
    getRecordData();
  }, [user])

  return (
    <div className="container">
      <Head>
        <title>{PROJECT_NAME}</title>
        <meta name="description" content="会計を漢気じゃんけんで決めるためのアプリケーション" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <p className={styles.description}>
          旅行での漢気を記録しよう
        </p>

        <Image src="/logo.png" alt="Otoko Logo" width={280} height={82} />
        <Image src="/main.svg" alt="money img" width={160} height={160} />

        <p className={styles.description}>
          Otokoは旅行先での<br />男気じゃんけんの結果を記録してくれます
        </p>

        {
          user === null
          ?
          <button className={styles.start_button} onClick={() => signIn()}>
            ログイン
          </button>
          :
          <>
            <button className={styles.start_button} onClick={moveNewPage}>
              はじめる
            </button>
            <div className={styles.recently_group_list}>
              <h2 className={styles.recently_group_title}>最近のグループ</h2>
              {
                recordData.map((record, index) => (
                  <div
                    key={index}
                    className={styles.recently_group_element}
                    onClick={() => router.push(`/record/${record.urlCode}`)}
                  >
                    <h2>{record.title}</h2>
                    <p>{record.date}</p>
                  </div>
                ))
              }
            </div>
          </>
        }
        
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home
