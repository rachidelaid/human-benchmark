import React, { useState } from 'react';

const Reaction = () => {
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState('');
  const [timer, setTimer] = useState(0);

  const handleClick = () => {
    if (started) {
      console.log(Date.now() - timer);
      setTimer(0);
      return;
    }

    const random = Math.random() * (3 - 1) + 1;
    setStarted(true);
    setColor('red');

    setTimeout(() => {
      setColor('green');
      setTimer(Date.now());
      // setStarted(false);
    }, random * 1000);
  };

  return (
    <div
      className="reaction"
      onClick={handleClick}
      style={{ backgroundColor: color }}
    >
      <p>When the red box turns green, click as quickly as you can.</p>
      <h3>Click anywhere to start.</h3>
    </div>
  );
};

export default Reaction;
