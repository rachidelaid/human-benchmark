import { useState } from 'react';

const Sequence = () => {
  const [status, setStatus] = useState('start');
  const [level, setLevel] = useState(1);
  let curIndex = 0;
  const sequence = [];

  const genSequence = () => {
    const r = Math.floor(Math.random() * 8);
    sequence.push(r);
  };

  const wait = (ms) => {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });
  };

  const playSequence = async () => {
    for (let i = 0; i < sequence.length; i++) {
      const index = sequence[i];
      const elm = document.querySelector(`.game > div:nth-child(${index + 1})`);
      elm.classList.add('active');
      await wait(500);
      elm.classList.remove('active');
    }
  };

  const start = async () => {
    genSequence();
    setStatus('game');
    setTimeout(() => {
      playSequence();
    }, 10);
  };

  const check = async (e) => {
    e.target.classList.add('active');
    setTimeout(() => {
      e.target.classList.remove('active');
    }, 300);
    console.log(e.target.dataset.index, sequence[curIndex]);
    if (e.target.dataset.index != sequence[curIndex]) {
      console.log('lose');
      return;
    }
  };

  return (
    <div className="sequence main">
      {status === 'start' && (
        <>
          <h2>Sequence Memory Test</h2>
          <p>Memorize the pattern</p>
          <button className="primary-btn" onClick={start}>
            Start
          </button>
        </>
      )}

      {status === 'game' && (
        <div className="game" onClick={check}>
          <div data-index="1"></div>
          <div data-index="2"></div>
          <div data-index="3"></div>
          <div data-index="4"></div>
          <div data-index="5"></div>
          <div data-index="6"></div>
          <div data-index="7"></div>
          <div data-index="8"></div>
          <div data-index="9"></div>
        </div>
      )}

      {status === 'result' && (
        <>
          <p>Sequence Memory</p>
          <h1>Level 1</h1>
          <a href="/">Home</a>
        </>
      )}
    </div>
  );
};

export default Sequence;
