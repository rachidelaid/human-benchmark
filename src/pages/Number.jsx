import { useState, useRef } from 'react/cjs/react.development';

const Number = () => {
  const [status, setStatus] = useState('start');
  const [num, setNum] = useState('');
  const [level, setLevel] = useState(0);
  const spn = useRef();
  const input = useRef();

  const generateNum = () => {
    let n = '';
    for (let i = 0; i <= level; i++) {
      const r = Math.floor(Math.random() * 10);
      n += r;
    }
    setNum(n);
  };

  const start = () => {
    setStatus('game');
    generateNum();
    setTimeout(() => {
      spn.current.style.width = 0;
      setTimeout(() => {
        setStatus('input');
      }, 3000);
    }, 20);
  };

  const check = () => {
    if (input.current.value == num) {
      setLevel(level + 1);
      setStatus('result');
    } else {
      setStatus('fail');
    }
  };

  const saveScore = () => {
    localStorage.setItem('number', `level ${level}`);
  };

  return (
    <div className="number main">
      {status === 'start' && (
        <>
          <h2>Number Memory</h2>
          <p>
            The average person can remember 7 numbers at once. Can you do more?
          </p>
          <button onClick={start}>Start</button>
        </>
      )}

      {status === 'game' && (
        <>
          <h1>{num}</h1>
          <div className="loading">
            <span ref={spn}></span>
          </div>
        </>
      )}

      {status === 'input' && (
        <>
          <h2>What was the number?</h2>
          <input type="text" ref={input} />
          <button className="primary-btn" onClick={check}>
            Submit
          </button>
        </>
      )}

      {status === 'result' && (
        <>
          <p>Number</p>
          <h2>{num}</h2>
          <p>Your answer</p>
          <h2>{input.current.value}</h2>
          <h1>Level {level}</h1>
          <button className="primary-btn" onClick={start}>
            NEXT
          </button>
        </>
      )}

      {status === 'fail' && (
        <>
          <p>Number</p>
          <h2>{num}</h2>
          <p>Your answer</p>
          <h2 style={{ textDecoration: 'line-through', color: 'red' }}>
            {input.current.value}
          </h2>
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

export default Number;
