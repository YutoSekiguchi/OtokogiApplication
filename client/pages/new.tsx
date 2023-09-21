import type { NextPage } from 'next'
import Head from 'next/head'
import { PROJECT_NAME } from '../configs/settings';
import EditForm from '../components/record/EditForm';

const New: NextPage = () => {

  return (
    <div className="container">
      <Head>
        <title>新規グループを作成|{PROJECT_NAME}</title>
        <meta name="description" content="会計を漢気じゃんけんで決めるためのアプリケーション" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditForm />
    </div>
  )
}

export default New;