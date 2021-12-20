import { useRef, useState } from 'react';

const Chimp = () => {
  const [status, setStatus] = useState('start');
  const [curNum, setCurNum] = useState(1);
  const [hidden, setHidden] = useState(false);

  const lives = useRef(3);
  const level = useRef(1);
  const array = useRef([]);
  const indexes = useRef([]);
  const genArr = () => {
    array.current = [...Array(level.current + 3).keys()].map((x) => x + 1);
  };

  const genIndexes = () => {
    const arr = [];
    while (true) {
      if (arr.length === level.current + 3) {
        break;
      }

      let r = Math.floor(Math.random() * 9 * 7);
      if (!arr.includes(r)) {
        arr.push(r);
      }
    }
    indexes.current = arr;
  };

  const hide = () => {
    document
      .querySelectorAll('.game div')
      .forEach((d) => d.classList.add('active'));
  };

  const reset = () => {
    setCurNum(1);
    setHidden(false);
    document.querySelectorAll('.game div').forEach((d) => {
      d.classList.remove('active');
      d.innerText = '';
      d.style.visibility = 'hidden';
    });
  };

  const show = async () => {
    reset();
    setTimeout(() => {
      if (document.querySelector('.game')) {
        for (let i = 0; i < indexes.current.length; i++) {
          const index = indexes.current[i];
          document.querySelector(`#cell-${index}`).innerText = array.current[i];
          document.querySelector(`#cell-${index}`).style.visibility = 'visible';
        }
      }
    }, 500);
  };

  const start = () => {
    genArr();
    genIndexes();
    setStatus('game');

    setTimeout(() => {
      show();
    }, 10);
  };

  const check = (e) => {
    if (!hidden) {
      hide();
      setHidden(true);
      return;
    }

    e.target.classList.remove('active');

    if (curNum == e.target.innerText) {
      if (curNum === array.current.length) {
        level.current++;
        genArr();
        genIndexes();
        show();
      } else {
        setCurNum(curNum + 1);
      }
    } else {
      lives.current--;
      genArr();
      genIndexes();
      show();

      if (lives.current === 0) {
        setStatus('result');
      }
    }
  };

  return (
    <div className="chimp main">
      {status === 'start' && (
        <>
          <h2>Are You Smarter Than a Chimpanzee?</h2>
          <p>Click the squares in order according to their numbers.</p>
          <p>The test will get progressively harder.</p>
          <button className="primary-btn" onClick={start}>
            Start
          </button>
        </>
      )}

      {status === 'game' && (
        <>
          <div className="game">
            {[...Array(9 * 7).keys()].map((x) => (
              <div key={x} id={`cell-${x}`} onClick={check}></div>
            ))}
          </div>
        </>
      )}

      {status === 'next' && (
        <>
          <p>NUMBERS</p>
          <h1>{level.current}</h1>
          <p>STRIKES</p>
          <h1>{lives} of 3</h1>
          <button className="primary-btn">Continue</button>
        </>
      )}

      {status === 'result' && (
        <>
          <p>Score</p>
          <h1>{level.current}</h1>
          <a href="/">Home</a>
        </>
      )}
    </div>
  );
};

export default Chimp;
