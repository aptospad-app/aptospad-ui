import React from "react";
import ReactDOM, {Root} from "react-dom/client";
import "./index.scss";
import {CommonUtility} from "@/Utilities";
import ErrorBoundary from "@/Components/ErrorBoundary";
import Splash from "@/Components/Splash";

if (!CommonUtility.isDevelopmentMode) {
  CommonUtility.rewriteConsole();
}

(async () => {
  const Main = (await import("./Main")).default;
  const {Provider} = await import("react-redux");
  const {store, persistor} = await import("./MyRedux");
  const {PersistGate} = await import("redux-persist/integration/react");
  const {CommonUtility} = await import("./Utilities");

  console.log(`%c You're running on "${CommonUtility.getAppMode()}" mode. React version is ${React.version}`, `background: black; color: #3ab925`);

  const container: Root = ReactDOM.createRoot(document.getElementById("root")!);

  container.render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={<Splash />} persistor={persistor}>
            <React.Suspense fallback={<Splash />}>
              <Main />
            </React.Suspense>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
})();
