import {useRef, useState, useEffect, MouseEventHandler} from "react";

/**
 * Run callback when state changed.
 * The state changes only when the old value is different from the new value
 *
 * @param init
 * @returns
 */
function useCustomState<T>(init: T): [T, (newState: T, callback?: (newState: T) => void) => any] {
  const [state, setState] = useState<T>(init);
  const cbRef: any = useRef();

  const setCustomState = (newState: T, callback?: Function): any => {
    cbRef.current = callback;
    setState(newState);
  };

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
    }
    cbRef.current = undefined;
  }, [state]);

  return [state, setCustomState];
}

/**
 * Fix warning: Can't perform a React state update on an unmounted component.
 *
 * References:
 * https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
 *
 * @returns {Object} refObject
 * @returns {boolean} refObject.curret - Whether React component is mounted or not.
 */
const useIsComponentMounted = () => {
  const isComponentMounted = useRef(false);

  useEffect(() => {
    isComponentMounted.current = true;

    return function cleanup() {
      isComponentMounted.current = false;
    };
  }, []);

  return isComponentMounted;
};

/**
 * This hook allows you to detect clicks outside of a specified element.
 *
 * References:
 * https://usehooks.com/useOnClickOutside
 *
 * @param {*} ref
 * @param {*} handler
 */
const useOnClickOutside = (ref: any, handler: MouseEventHandler) => {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
};

const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";
  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;

    return {
      width,
      height
    };
  };
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };
      window.addEventListener("resize", handleResize);

      // Specify how to clean up after this effect:
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};

export const CustomHookUtility = {
  useIsComponentMounted,
  useOnClickOutside,
  useCustomState,
  useWindowDimensions
};
