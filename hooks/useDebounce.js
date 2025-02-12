import { useEffect, useState } from "react";
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}
export default useDebounce;

// TYPESCRIPT
// function useDebounce<T>(value: T, delay?: number): T {
//   const [debouncedValue, setDebouncedValue] = useState < T > value;

//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }
