import { useState, useRef } from 'react';
import { TRANSFORM_AMOUNT } from '../utils/constants';

const useParralaxOnBlock = () => {
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);
  const block = useRef();

  const transformBlock = (evt) => {
    setMouseX(evt.pageX);
    setMouseY(evt.pageY);

    const centerX = block.current.offsetLeft + block.current.clientWidth / 2;
    const centerY = block.current.offsetTop + block.current.clientHeight / 2;

    const percentX = (centerX - mouseX) / (block.current.clientWidth / 2);
    const percentY = -((centerY - mouseY) / (block.current.clientHeight / 2));

    block.current.style.transform = `perspective(300px) rotateY(${percentX * TRANSFORM_AMOUNT}deg) rotateX(${percentY * TRANSFORM_AMOUNT}deg) scale3d(1.1, 1.1, 1.1)`;
  }

  function handleMouseEnter() {
    setTimeout(() => {
      block.current.style.transition = '';
    }, 100);
    block.current.style.transition = 'transform 0.1s';
  }

  function handleMouseLeave() {
    block.current.style.transition = 'transform 0.1s';
      setTimeout(() => {
        block.current.style.transition = '';
      }, 100);

    block.current.style.transform = `perspective(300px) rotateY(0deg) rotateX(0deg) scale3d(1.1, 1.1, 1.1)`;;
  }

  return { transformBlock, handleMouseEnter, handleMouseLeave, block };
}

export default useParralaxOnBlock;