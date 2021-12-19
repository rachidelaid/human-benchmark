import { useState, useEffect } from 'react/cjs/react.development';
import randomWords from 'random-words';

const Verbal = () => {
  const [status, setStatus] = useState('start');
  const [wordList, setWordList] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const shuffleArray = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const generateWords = () => {
    const list = randomWords(10).filter((w) => w.length >= 3);

    let l = shuffleArray([
      ...list,
      ...list,
      ...list,
      ...list,
      ...list,
      ...list,
      ...list,
    ]);
    setWordList(l);
  };

  useEffect(() => {
    generateWords();
  }, []);

  const handleClick = (e) => {
    if (e.target.innerText === 'Old') {
      if (wordList.indexOf(wordList[index]) < index) {
        setScore(score + 1);
      } else {
        setLives(lives - 1);
      }
    }

    if (e.target.innerText === 'New') {
      if (wordList.indexOf(wordList[index]) === index) {
        setScore(score + 1);
      } else {
        setLives(lives - 1);
      }
    }

    setIndex(index + 1);
  };

  return (
    <div className="verbal main">
      {status === 'start' && (
        <>
          <h2>Verbal Memory Test</h2>
          <p>
            You will be shown words, one at a time. If you've seen a word during
            the test, click SEEN If it's a new word, click NEW
          </p>
          <button className="primary-btn" onClick={() => setStatus('game')}>
            START
          </button>
        </>
      )}

      {status === 'game' && lives > 0 && (
        <>
          <div className="status">
            <div className="lives">
              lives: <span>{lives}</span>
            </div>
            <div className="score">
              score: <span>{score}</span>
            </div>
          </div>
          <h1>{wordList[index]}</h1>
          <div>
            <button onClick={handleClick}>Old</button>
            <button onClick={handleClick}>New</button>
          </div>
        </>
      )}

      {lives === 0 && (
        <>
          <p>Verbal Memory</p>
          <h1>{score} Words</h1>
          <a href="/" className="btn">
            home
          </a>
        </>
      )}
    </div>
  );
};

export default Verbal;
