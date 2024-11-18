type DebounceFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): DebounceFunction<T> => {
  let timer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): void => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export { debounce };
