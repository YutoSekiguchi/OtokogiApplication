import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { NextPage } from 'next';
import Image from 'next/image'
import styles from '../../styles/App.module.css'
import { PROJECT_NAME } from '../../configs/settings';
import { useUserStore } from '../../stores/user';
import { login } from '../../services/user';

const Header: NextPage = () => {
  const {data: session} = useSession();
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);

  useEffect(() => {
    const getUserData = async() => {
      if(session && session.user && session.user.email !== null && session.user.email !== undefined) {
        const res =  await login(session.user.email);
        setUserData(res);
      }
    }
    if(!Object.keys(user).length) {
      getUserData();
    }
  }, [session])

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        {PROJECT_NAME}
      </h1>
      <div className={styles.header_items}>
        {
          session
          ?
          <>
            {session.user?.image && (
              <div>
                <Image className={styles.user_icon} src={session.user?.image} alt="" width={36} height={36} />
              </div>
            )}
          </>
          :
          <>
            <button className={styles.login_button} onClick={() => signIn()}>
              ログイン
            </button>
          </>
        }
      </div>
    </header>
  );
}

export default Header;