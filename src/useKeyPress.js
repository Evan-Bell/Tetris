import { useState, useEffect } from 'react';

//THIS CODE WAS TAKEN FROM https://betterprogramming.pub/create-a-typing-game-with-react-hooks-usekeypress-and-faker-28bbc7919820
//I DID NOT WRITE IT


const useKeyPress = callback => {
  const [keyPressed, setKeyPressed] = useState();
  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key.length === 1) {
        setKeyPressed(key);
        callback && callback(key);
      }
    };
    const upHandler = () => {
      setKeyPressed(null);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });
  return keyPressed;
};

export default useKeyPress;