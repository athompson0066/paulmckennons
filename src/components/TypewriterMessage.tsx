import { useState, useEffect } from 'react';

interface TypewriterMessageProps {
  text: string;
  speed?: number;
}

export default function TypewriterMessage({ text, speed = 30 }: TypewriterMessageProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    
    // Reset displayed text if text prop changes
    setDisplayedText('');

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.substring(0, index));
      
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}
