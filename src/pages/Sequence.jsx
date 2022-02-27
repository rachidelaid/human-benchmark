import { useState, useRef } from 'react';

const Sequence = () => {
  const sound = ['C3', 'D3', 'E3', 'F3', 'G3', 'A4', 'B4', 'C4', 'D4'];

  const [status, setStatus] = useState('start');
  const [level, setLevel] = useState(1);
  const [playing, setPlaying] = useState(false);
  const curIndex = useRef(0);
  const sequence = useRef([]);

  const playSound = (i) => {
    let s = new Audio(
      `https://www.virtualmusicalinstruments.com/musical_instruments/xylophone/sounds/${sound[i]}.mp3`,
    );
    s.volume = 0.5;
    s.currentTime = 0;
    s.loop = false;
    s.play();
  };

  const genSequence = () => {
    const r = Math.floor(Math.random() * 9);

    sequence.current.push(r);
  };

  const wait = (ms) => {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });
  };

  const playSequence = async () => {
    setPlaying(true);

    await wait(600);
    for (let i = 0; i < sequence.current.length; i++) {
      const index = sequence.current[i];
      playSound(index);
      await wait(100);
      const elm = document.querySelector(`.game > [data-index="${index + 1}"]`);
      elm.classList.add('active');
      await wait(500);
      elm.classList.remove('active');
      await wait(100);
    }

    setPlaying(false);
  };

  const start = async () => {
    setStatus('game');
    genSequence();
    setTimeout(() => {
      playSequence();
    }, 10);
  };

  const check = async (e) => {
    if (playing) return;

    e.target.classList.add('active');
    setTimeout(() => {
      e.target.classList.remove('active');
    }, 300);

    console.log(e.target.dataset.index, sequence.current[curIndex.current] + 1);

    if (+e.target.dataset.index !== sequence.current[curIndex.current] + 1) {
      setStatus('result');
      return;
    }

    playSound(e.target.dataset.index - 1);
    curIndex.current += 1;

    if (curIndex.current >= sequence.current.length) {
      setLevel(level + 1);
      curIndex.current = 0;
      genSequence();
      playSequence();
    }
  };

  const saveScore = () => {
    localStorage.setItem('sequence', `level ${level}`);
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
          <h1>Level {level}</h1>
          <button className="primary-btn" onClick={saveScore}>
            save score
          </button>
          <a href="/">Home</a>
        </>
      )}
    </div>
  );
};

export default Sequence;
