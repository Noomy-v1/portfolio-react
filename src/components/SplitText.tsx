import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface WordPart {
  text: string;
  em?: boolean;
  break?: boolean;
}

interface SplitTextProps {
  parts: WordPart[];
}

export function SplitText({ parts }: SplitTextProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const fonts = document.fonts;
    const show = () => setReady(true);
    if (!fonts?.ready) {
      show();
      return;
    }
    fonts.ready.then(show);
  }, [parts]);

  const fullText = parts.map((p) => p.text).join(' ');

  return (
    <h1 className="hero-title" aria-label={fullText} style={{ visibility: ready ? 'visible' : 'hidden' }}>
      {parts.map((part, index) => (
        <span key={`${part.text}-${index}`}>
          {part.break && <br />}
          <motion.span
            className="split-word"
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ type: 'spring', duration: 5, bounce: 0, delay: index * 0.05 }}
          >
            {part.em ? <em>{part.text}</em> : part.text}
          </motion.span>
          {index < parts.length - 1 && !parts[index + 1]?.break ? ' ' : null}
        </span>
      ))}
    </h1>
  );
}