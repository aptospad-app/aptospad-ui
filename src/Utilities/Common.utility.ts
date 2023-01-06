/**
 * Override console object.
 */
const rewriteConsole = (): void => {
  const oldConsole = {...console};

  const log = (...args: any) => {
    if (process.env.NODE_ENV === "development") {
      oldConsole.log(...args);
    }
  };

  const error = (...args: any) => {
    if (process.env.NODE_ENV === "development") {
      oldConsole.error(...args);
    }
  };

  window.console = {...console, log, error};
};

/**
 * Convert string to ellipsis at the middle.
 *
 * @param {string} text - String need to convert
 * @param {number} charactor - Number of characters displayed at the beginning and at the end
 */
const stringEllipsisMiddle = (text: string, charactor: number = 4): string => {
  if (text.length > 9) {
    const start = text.slice(0, charactor);
    const end = text.slice(-charactor);

    return `${start}...${end}`;
  } else {
    return text;
  }
};

/**
 * There is a built-in environment variable called NODE_ENV. You can read it
 * from process.env.NODE_ENV. When you run npm start, it is always equal to 'development',
 * when you run npm test it is always equal to 'test', and when you run npm run build to
 * make a production bundle, it is always equal to 'production'.
 * You cannot override NODE_ENV manually. This prevents developers from accidentally
 * deploying a slow development build to production.
 *
 * References:
 * https://create-react-app.dev/docs/adding-custom-environment-variables/
 *
 * @returns {boolean}
 */
const getAppMode = (): string | undefined => {
  return process.env.NODE_ENV;
};

/**
 * Check is development mode.
 *
 * @returns {boolean}
 */
const isDevelopmentMode = (): boolean => {
  return process.env.NODE_ENV === "development";
};

/**
 * Create a delay before running the next line of code.
 *
 * @param {number} millisecond
 */
const delay = (millisecond: number): void => {
  const condition = new Date().getTime();
  let start = condition;
  while (start <= condition + millisecond) {
    start = new Date().getTime();
  }
};

const kFormatter = (value: string | number): string => {
  return Intl.NumberFormat("en", {"notation": "compact"}).format(parseFloat(value as any));
};

const commaFormatter = (value: string | number): string => {
  return Intl.NumberFormat("en-US").format(parseFloat(value as any));
};

const allowSixDigitsAfterDecimalPoint = (value: string): boolean => {
  const rgx = /^[0-9]*\.?[0-9]{0,6}$/; // Accept 2 digits after decimal point only

  return rgx.test(value);
};

export const CommonUtility = {
  rewriteConsole,
  stringEllipsisMiddle,
  getAppMode,
  isDevelopmentMode,
  delay,
  kFormatter,
  commaFormatter,
  allowSixDigitsAfterDecimalPoint
};
