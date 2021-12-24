import { useEffect, useState, useRef } from 'react';

const Typing = () => {
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const text =
    'It was a smart little landau which rattled up to the door of Briony Lodge. As it pulled up, one of the loafing men at the corner dashed forward to open the door in the hope of earning a copper, but was elbowed away by another loafer, who had rushed up with the same intention. A fierce quarrel broke out, which was increased by the two guardsmen, who took sides with one of the loungers, and by the scissors-grinder, who was equally hot upon the other side.';

  const correct = useRef(0);
  const input = useRef(0);
  let curIndex = 0;
  // let started = false;

  useEffect(() => {
    let loop = null;
    if (started) {
      loop = setInterval(() => {
        console.log('loop');
        setSeconds(seconds + 1);
      }, 1000);
    } else if (!started && seconds !== 0) {
      clearInterval(loop);
    } else {
      document.addEventListener('keypress', key);
      document.addEventListener('keydown', del);
    }

    return () => clearInterval(loop);
  }, [started, seconds]);

  const del = (e) => {
    if (e.key !== 'Backspace') return;
    if (curIndex !== 0) {
      curIndex--;
      document.querySelector(
        `.input .letter[data-index="${curIndex}"]`
      ).className = 'letter';
      moveLine(0);
    }
  };

  const moveLine = (n) => {
    document.querySelector('.line').remove();
    const nextElm = document.querySelector(
      `.input .letter[data-index="${curIndex + n}"]`
    );
    const span = document.createElement('span');
    span.innerText = '|';
    span.classList.add('line');
    document.querySelector('.input').insertBefore(span, nextElm);
  };

  // const timer = () => {
  //   setInterval(() => {
  //     seconds.current++;
  //     console.log('loop');
  //   }, 1000);
  // };

  const key = (e) => {
    if (!started) {
      setStarted(true);
      // timer();
    }

    const curElm = document.querySelector(
      `.input .letter[data-index="${curIndex}"]`
    );

    if (curElm) {
      input.current++;
      if (text[curIndex] === e.key) {
        curElm.classList.add('right');
        correct.current++;
      } else {
        curElm.classList.add('wrong');
      }
      moveLine(1);
      curIndex += 1;
    }

    if (input.current === text.length) {
      // clearInterval(loop);
      // setLoop(null);
      setStarted(false);
    }
  };

  const saveScore = () => {
    const s = Math.floor(correct.current / 5 / (seconds / 60));
    localStorage.setItem('typing', `${s} WPM`);
  };

  return (
    <div className="main typing">
      {text.length !== input.current && (
        <>
          {seconds === 0 && <h2>Typing Test</h2>}
          {seconds !== 0 && (
            <h2>{Math.floor(correct.current / 5 / (seconds / 60))}</h2>
          )}

          <p>How many words per minute can you type?</p>
          <div className="input">
            <span className="line">|</span>
            {text.split('').map((l, i) => (
              <span key={i} data-index={i} className="letter">
                {l}
              </span>
            ))}
          </div>
          <p>Start typing to begin.</p>
        </>
      )}

      {text.length === input.current && (
        <>
          <p>Typing Test</p>
          <h2>{Math.floor(correct.current / 5 / (seconds / 60))} WPM</h2>
          <button className="primary-btn" onClick={saveScore}>
            save score
          </button>
          <a href="/">Home</a>
        </>
      )}
    </div>
  );
};
export default Typing;
