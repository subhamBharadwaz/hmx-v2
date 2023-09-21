import { useState, useEffect, RefObject } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export const useDimensions = <T extends HTMLElement>(
  ref: RefObject<T>
): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const { offsetWidth, offsetHeight } = ref.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions(); // Initial measurement

    const handleResize = () => {
      requestAnimationFrame(updateDimensions);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return dimensions;
};
