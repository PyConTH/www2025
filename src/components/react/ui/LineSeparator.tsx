import { useEffect, useRef, useState } from "react";

const delayOffset = 100; // Delay in milliseconds before the line appears

const LineSeparator = () => {
  const [isReached, setIsReached] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function onScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    if (ref.current) {
      const elementPosition = ref.current.offsetTop;
      setIsReached(scrollPosition >= elementPosition + delayOffset);
      console.log(
        `Scroll Position: ${scrollPosition}, Element Position: ${elementPosition}`,
      );
      console.log(`Is Reached: ${scrollPosition >= elementPosition}`);
    }
  }

  return (
    <div
      ref={ref}
      className={` ${isReached ? "line-in-animation" : ""} mx-auto h-0.5 w-full bg-gray-200`}
    ></div>
  );
};

export default LineSeparator;
