const limitNumberInput = (value: string, min: number, max: number): string => {
  if (+value < min) {
    return min.toString();
  }
  if (+value > max) {
    return max.toString();
  }
  return value;
};

export default limitNumberInput;
