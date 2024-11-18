type DebounceFunction<T extends (...args: any[]) => unknown> = (
  ...args: Parameters<T>
) => void;

const debounce = <T extends (...args: any[]) => unknown>(
  fn: T,
  delay: number
): DebounceFunction<T> => {
  let timer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export { debounce };
