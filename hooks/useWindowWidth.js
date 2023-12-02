import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(_ => {
    const getWindowWidth = _ => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', getWindowWidth);
    getWindowWidth();
    return _ => window.removeEventListener('resize', getWindowWidth);
  }, []);
  return screenWidth;
}

export default useWindowWidth;
