const allowAnyDigitsAfterDecimalPoint = (value: string): boolean => {
  const rgx = /^[0-9]*\.?[0-9]*$/; // Accept any how many digits after decimal point

  return rgx.test(value);
};

const allowTwoDigitsAfterDecimalPoint = (value: string): boolean => {
  const rgx = /^[0-9]*\.?[0-9]{0,2}$/; // Accept 2 digits after decimal point only

  return rgx.test(value);
};

/**
 * [description]
 * @param  {[String]} email [description]
 * @return {[Boolean]}       [description]
 */
const isEmail = (email: string) => {
  /* eslint-disable-next-line */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const RegexUtility = {
  allowAnyDigitsAfterDecimalPoint,
  allowTwoDigitsAfterDecimalPoint,
  isEmail
};
