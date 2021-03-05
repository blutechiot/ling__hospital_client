import React, { useEffect } from 'react';

// keep typescript happy
const noop = () => {};

const useInterval = (
  callback: () => void,
  delay: number | null | false,
  immediate?: boolean,
  cleanup?: () => any,
) => {
  const savedCallback = React.useRef(noop);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Execute callback if immediate is set.
  useEffect(() => {
    if (!immediate) return;
    if (delay === null || delay === false) return;
    savedCallback.current();
    return () => {
      cleanup && cleanup();
    };
  }, [immediate]);

  // Set up the interval
  useEffect(() => {
    if (delay === null || delay === false) return undefined;
    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => {
      clearInterval(id);
      cleanup && cleanup();
    };
  }, [delay]);
};
export default useInterval;