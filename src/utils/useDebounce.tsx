import { useRef, useEffect, useCallback } from "react";

const useDebounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      cancel();
      timer.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay, cancel],
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return Object.assign(debounced, { cancel });
};

export default useDebounce;
