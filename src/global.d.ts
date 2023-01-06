declare global {
  interface Window {
    FB: {
      CustomerChat: {
        hide: () => void;
        show: () => void;
      };
    };
    Web3: any;
    BinanceChain: any;
    ethereum: any;
  }

  interface Element {
    style: CSSStyleDeclaration
  }

  type Nullable<T> = T | undefined | null;
}

export {};
