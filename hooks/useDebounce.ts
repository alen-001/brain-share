import { useRef, useEffect, useCallback } from 'react';

const useDebounce =<T extends ((...args:any[])=>void)>(fn:T,delay:number):T=> {
  const timeoutRef = useRef<number | null>(null);

  const debouncedFn = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }, [fn, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFn as T;
};

export default useDebounce;
