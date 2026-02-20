import { useEffect, useState } from 'react';

const phrases = [
  'Building scalable full stack products',
  'Creating smooth animated interfaces',
  'Shipping APIs and frontend systems',
];

function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const activePhrase = phrases[phraseIndex];
    const isComplete = displayText === activePhrase;
    const isEmpty = displayText.length === 0;

    let timeout = deleting ? 35 : 65;

    if (!deleting && isComplete) {
      timeout = 1300;
      const id = setTimeout(() => setDeleting(true), timeout);
      return () => clearTimeout(id);
    }

    if (deleting && isEmpty) {
      const id = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 160);
      return () => clearTimeout(id);
    }

    const id = setTimeout(() => {
      setDisplayText((prev) => {
        if (deleting) {
          return prev.slice(0, -1);
        }
        return activePhrase.slice(0, prev.length + 1);
      });
    }, timeout);

    return () => clearTimeout(id);
  }, [deleting, displayText, phraseIndex]);

  return (
    <p className="typing-text">
      {displayText}
      <span className="typing-caret">|</span>
    </p>
  );
}

export default TypingText;
