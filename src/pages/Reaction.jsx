import { useState } from 'react';

const Reaction = () => {
  const [status, setStatus] = useState('start');
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState('');
  const [timer, setTimer] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [runs, setRuns] = useState([]);
  const [timeOut, setTimeOut] = useState(null);

  const run = () => {
    setStatus('start');
    const random = Math.random() * (3 - 1) + 1;
    setColor('red');

    const x = setTimeout(() => {
      setStarted(true);
      setColor('green');
      setTimer(Date.now());
    }, random * 1000);
    setTimeOut(x);
  };

  const reset = () => {
    setTimer(0);
    setStarted(false);
    setColor('rgb(0, 174, 255)');
  };

  const handleClick = () => {
    if (status === 'done') return;

    if (started) {
      const d = Date.now() - timer;
      setFinalTime(d);
      const r = [...runs, d];
      setRuns(r);
      setStatus('win');
      reset();
      return;
    }

    if (color === 'red') {
      clearTimeout(timeOut);
      const r = [...runs, 0];
      setRuns(r);
      setStatus('lose');
      reset();
      return;
    }

    if (runs.length >= 3) {
      console.log('DONE');
      reset();
      setStatus('done');
    } else {
      run();
    }
  };

  return (
    <div
      className="reaction main"
      onClick={handleClick}
      style={{ backgroundColor: color }}
    >
      {status === 'start' && (
        <>
          <p>When the red box turns green, click as quickly as you can.</p>
          <h2>Click anywhere to start.</h2>
        </>
      )}

      {status === 'lose' && (
        <>
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
            />
          </svg>
          <h2>Too soon!</h2>
          <p>click to start again.</p>
        </>
      )}

      {status === 'win' && (
        <>
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z"
            />
          </svg>
          <h2>{finalTime} ms</h2>
          <p>Click to keep going</p>
        </>
      )}

      {status === 'done' && (
        <>
          <p>your reaction time:</p>
          <h2>
            {Math.floor(
              runs.filter((x) => x > 0).reduce((a, b) => a + b) /
                runs.filter((x) => x > 0).length
            )}{' '}
            ms
          </h2>
          <a href="/">home</a>
        </>
      )}
    </div>
  );
};

export default Reaction;
