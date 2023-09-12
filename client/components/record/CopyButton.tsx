import { useState } from 'react';
import styles from "../../styles/Reccord.module.css"
import { IcBaselineContentPaste } from '../common/icons/IcBaselineContentPaste';
import { IcBaselineCheck } from '../common/icons/IcBaselineCheck';

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      setCopied(true);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      disabled={copied}
      className={styles.copy_button}
    >
      {copied ? <IcBaselineCheck /> : <IcBaselineContentPaste />}
      {copied ? 'コピー完了' : 'URLをコピー'}
    </button>
  );
};

export default CopyButton;