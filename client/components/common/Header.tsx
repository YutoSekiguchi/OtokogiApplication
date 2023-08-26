import React, { useEffect, useRef, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { NextPage } from 'next';
import Image from 'next/image'
import styles from '../../styles/App.module.css'
import { PROJECT_NAME } from '../../configs/settings';
import { useUserStore } from '../../stores/user';
import { login } from '../../services/user';
import { useRouter } from 'next/router';

const Header: NextPage = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  // dropdown要素の削除に関するuseEffect
  useEffect(() => {
    // クリックイベントを定義
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && buttonRef.current && !dropdownRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
        setIsDropdown(false);
      }
    }
    // グローバルでクリックイベントを監視
    document.addEventListener('click', handleClickOutside);
    return () => {
      // コンポーネントがアンマウントされた際にクリックイベントリスナーを削除
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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

  const DropDownMenu = () => {
    return (
      <div ref={dropdownRef} className={styles.dropdown}>
        aaa
      </div>
    );
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={() => {router.push("/")}}>
        {PROJECT_NAME}
      </h1>
      <div className={styles.header_items}>
        {
          session
          ?
          <>
            {session.user?.image && (
              <div ref={buttonRef} className={styles.user_icon_box}>
                <Image 
                  className={styles.user_icon}
                  src={session.user?.image}
                  onClick={() => { setIsDropdown(prev => !prev) }}
                  alt="" width={36} height={36}
                />
                {
                  isDropdown && <DropDownMenu />
                }
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