import React from "react";
import ReactDOM, {Root} from "react-dom/client";
import "./index.scss";
import {CommonUtility} from "@/Utilities";
import ErrorBoundary from "@/Components/ErrorBoundary";
import Splash from "@/Components/Splash";
import {
  WalletProvider,
  // HippoWalletAdapter,
  AptosWalletAdapter,
  HippoExtensionWalletAdapter,
  MartianWalletAdapter,
  FewchaWalletAdapter,
  PontemWalletAdapter,
  SpikaWalletAdapter,
  RiseWalletAdapter,
  FletchWalletAdapter,
  TokenPocketWalletAdapter,
  ONTOWalletAdapter,
  // BloctoWalletAdapter,
  SafePalWalletAdapter
} from "@manahippo/aptos-wallet-adapter";

if (!CommonUtility.isDevelopmentMode) {
  CommonUtility.rewriteConsole();
}

(async () => {
  const Main = (await import("./Main")).default;
  const {Provider} = await import("react-redux");
  const {store, persistor} = await import("./MyRedux");
  const {PersistGate} = await import("redux-persist/integration/react");
  const {CommonUtility} = await import("./Utilities");
  const wallets = [
    // new HippoWalletAdapter(),
    new MartianWalletAdapter(),
    new AptosWalletAdapter(),
    new FewchaWalletAdapter(),
    new HippoExtensionWalletAdapter(),
    new PontemWalletAdapter(),
    new SpikaWalletAdapter(),
    new RiseWalletAdapter(),
    new FletchWalletAdapter(),
    new TokenPocketWalletAdapter(),
    new ONTOWalletAdapter(),
    // new BloctoWalletAdapter(),
    new SafePalWalletAdapter()
  ];

  console.log(`%c You're running on "${CommonUtility.getAppMode()}" mode. React version is ${React.version}`, `background: black; color: #3ab925`);

  const container: Root = ReactDOM.createRoot(document.getElementById("root")!);

  container.render(
    <React.StrictMode>
      <ErrorBoundary>
        <WalletProvider
          wallets={wallets}
          autoConnect={true}
          onError={(error: Error) => {
            console.log("Handle Error Message", error);
          }}>
          <Provider store={store}>
            <PersistGate loading={<Splash />} persistor={persistor}>
              <React.Suspense fallback={<Splash />}>
                <Main />
              </React.Suspense>
            </PersistGate>
          </Provider>
        </WalletProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
})();
