import { useRef, useState } from 'react';

const Target = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"
      />
    </svg>
  );
};

const Aim = () => {
  const [status, setStatus] = useState('start');
  const [left, setLeft] = useState(30);
  const [runs, setRuns] = useState([]);
  const [time, setTime] = useState(0);
  const target = useRef();
  const hit = useRef();
  const noHit = useRef();

  const position = useRef({ width: 0, height: 0 });

  const sound = (c) => {
    let s;
    if (c) {
      s = hit.current;
    } else {
      s = noHit.current;
    }
    s.currentTime = 0;
    s.loop = false;
    s.play();
  };

  const getPosition = () => {
    const w = window.innerWidth - 150;
    const h = window.innerHeight - 150;

    while (true) {
      const width = Math.floor(Math.random() * w);
      const height = Math.floor(Math.random() * h);

      if (
        width !== position.current.width ||
        height !== position.current.height
      ) {
        position.current = { width, height };
        break;
      }
    }
  };

  const start = () => {
    getPosition();
    setStatus('game');
    setTimeout(() => {
      setTime(Date.now());
      target.current.style.transform = `translate(${position.current.width}px,${position.current.height}px)`;
    }, 20);
  };

  const handleClick = () => {
    if (left === 1) {
      setTime(0);
      setStatus('result');
      return;
    }

    sound(true);

    const t = Date.now() - time;
    setRuns([...runs, t]);
    setTime(Date.now());
    setLeft(left - 1);
    getPosition();
    target.current.style.transform = `translate(${position.current.width}px,${position.current.height}px)`;
  };

  const miss = (e) => {
    if (e.target.classList.contains('game') || e.type === 'p') {
      sound(false);
    }
  };

  const saveScore = () => {
    localStorage.setItem(
      'aim',
      `${Math.floor(runs.reduce((a, b) => a + b) / runs.length)} ms`
    );
  };

  return (
    <div className="aim main">
      <audio
        ref={hit}
        preload="auto"
        src="http://soundjax.com/reddo/19496%5Eclick1.mp3"
      />
      <audio
        ref={noHit}
        preload="auto"
        src="http://soundjax.com/reddo/44843%5Emouseclick.mp3"
      />
      {status === 'start' && (
        <>
          <h2>Aim Trainer</h2>
          <Target />
          <p>Hit 30 targets as quickly as can.</p>
          <p>Click the target above to begin.</p>
          <button className="primary-btn" onClick={start}>
            start
          </button>
        </>
      )}

      {status === 'game' && (
        <div className="game" onClick={miss}>
          <p>remaining: {left}</p>
          <div ref={target} onClick={handleClick}>
            <Target />
          </div>
        </div>
      )}

      {status === 'result' && (
        <>
          <p>Average time per target</p>
          <h1>{Math.floor(runs.reduce((a, b) => a + b) / runs.length)} ms</h1>
          <button className="primary-btn" onClick={saveScore}>
            save score
          </button>
          <a href="/">Home</a>
        </>
      )}
    </div>
  );
};

export default Aim;
