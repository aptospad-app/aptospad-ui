export const RegexUtility = {
  "allowAnyDigitsAfterDecimalPoint": (value: string): boolean => {
    const rgx = /^[0-9]*\.?[0-9]*$/; // Accept any how many digits after decimal point

    return rgx.test(value);
  },
  "allowTwoDigitsAfterDecimalPoint": (value: string): boolean => {
    const rgx = /^[0-9]*\.?[0-9]{0,2}$/; // Accept 2 digits after decimal point only

    return rgx.test(value);
  }
};
