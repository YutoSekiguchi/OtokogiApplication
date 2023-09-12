import { useState } from 'react';
import styles from "../../styles/Reccord.module.css"

const ShareButton: React.FC<{ textToShare: string }> = ({ textToShare }) => {
  // const [copied, setCopied] = useState(false);

  // const handleCopy = () => {
  //   const textArea = document.createElement('textarea');
  //   textArea.value = textToShare;
  //   document.body.appendChild(textArea);
  //   textArea.select();

  //   try {
  //     document.execCommand('copy');
  //     setCopied(true);
  //   } catch (err) {
  //     console.error('コピーに失敗しました:', err);
  //   } finally {
  //     document.body.removeChild(textArea);
  //   }
  // };

  return (
    <button
      className={styles.copy_button}
    >
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