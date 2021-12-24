import { useState, useRef } from 'react';

const Visual = () => {
  const [status, setStatus] = useState('start');
  const [playing, setPlaying] = useState(false);
  const [levelUp, setLevelUp] = useState(false);
  const [lives, setLives] = useState(3);
  const [tries, setTries] = useState(3);

  const squares = useRef(3);
  const level = useRef(1);
  const answers = useRef([]);
  const sequence = useRef([]);
  const genSequence = () => {
    const arr = [];
    while (true) {
      if (arr.length === level.current) {
        break;
      }
      let r = Math.floor(Math.random() * squares.current * squares.current);
      if (!arr.includes(r)) {
        arr.push(r);
      }
    }
    sequence.current = arr;
  };

  const wait = (ms) => {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });
  };

  const reset = () => {
    console.log(squares.current);
    document.querySelectorAll('.game > div').forEach((d) => (d.className = ''));
    setTries(3);
    answers.current = [];
    setPlaying(true);
  };

  const playSequence = async () => {
    if (level.current % 5 === 0 && !levelUp) {
      setLevelUp(true);
      squares.current++;
      document.querySelector('.game').style.gridTemplateColumns = `${Math.floor(
        400 / squares.current
      )}px `.repeat(squares.current);
      document.querySelector('.game').style.gridTemplateRows = `${Math.floor(
        400 / squares.current
      )}px `.repeat(squares.current);
    }
    reset();
    await wait(500);

    for (let i = 0; i < sequence.current.length; i++) {
      const index = sequence.current[i];
      const div = document.querySelector(`.game div:nth-child(${index + 1})`);
      if (div === null) {
        break;
      }
      div.style.height = '0';
      setTimeout(() => {
        div.classList.add('active');
        div.style.height = `${Math.floor(400 / squares.current)}px`;
        setTimeout(() => {
          div.style.height = '0';
          setTimeout(() => {
            div.classList.remove('active');
            div.style.height = `${Math.floor(400 / squares.current)}px`;
            setPlaying(false);
          }, 200);
        }, 700);
      }, 200);
    }
  };

  const check = (e) => {
    if (playing) return;

    const id = Number(e.target.id);
    if (!sequence.current.includes(id)) {
      e.target.classList.add('wrong');
      setTries(tries - 1);
      if (tries <= 1) {
        setLives(lives - 1);
        setTimeout(() => {
          genSequence();
          playSequence();
        }, 500);
      }
    } else {
      answers.current.push(id);
      e.target.classList.add('active');
      setLevelUp(false);
      if (answers.current.length === sequence.current.length) {
        level.current++;

        genSequence();
        setTimeout(() => {
          playSequence();
        }, 500);
      }
    }
  };

  const start = () => {
    genSequence();
    setStatus('game');

    setTimeout(() => {
      playSequence();
    }, 10);
  };

  const saveScore = () => {
    localStorage.setItem('visual', `level ${level.current}`);
  };

  return (
    <div className="visual main">
      {status === 'game' && lives !== 0 && (
        <>
          <div className="flex">
            <h2>Level {level.current}</h2>
            <h4>Lives: {lives}</h4>
          </div>
          <div className="game">
            {[...Array(squares.current * squares.current).keys()].map((x) => (
              <div
                key={x}
                id={x}
                onClick={check}
                style={{
                  width: Math.floor(400 / squares.current),
                  height: Math.floor(400 / squares.current),
                }}
              ></div>
            ))}
          </div>
        </>
      )}

      {status === 'start' && (
        <>
          <h2>Visual Memory Test</h2>
          <p>memorize the sequence.</p>
          <button className="primary-btn" onClick={start}>
            Start
          </button>
        </>
      )}

      {lives === 0 && (
        <>
          <p>Visual Memory</p>
          <h1>Level {level.current}</h1>
          <button className="primary-btn" onClick={saveScore}>
            save score
          </button>
          <a href="/">Home</a>
        </>
      )}
    </div>
  );
};

export default Visual;
