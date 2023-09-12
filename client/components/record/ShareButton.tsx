import { useState } from 'react';
import styles from "../../styles/Reccord.module.css"
import { IcSharpOpenInNew } from '../common/icons/IcSharpOpenInNew';

const ShareButton: React.FC<{ textToShare: string }> = ({ textToShare }) => {
  return (
    <button
      className={styles.copy_button}
    >
      <IcSharpOpenInNew />
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${textToShare}`}
        className={styles.share_text}
        target="_blank"
        rel="nofollow noopener noreferrer"
        >
          LINEでシェア
        </a>
    </button>
  );
};

export default ShareButton;