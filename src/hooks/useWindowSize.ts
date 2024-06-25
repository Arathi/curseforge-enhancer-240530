import { useEffect, useState } from "react";

export interface WindowSize {
  width: number;
  height: number;
  scale: number;
}

export const useWindowSize = () => {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
    scale: window.devicePixelRatio,
  });

  useEffect(() => {
    window.onresize = () => {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight,
        scale: window.devicePixelRatio,
      };
      console.info(`窗口大小发生变化：`, size);
      setSize(size);
    };
  });

  return [size, setSize];
};
