import React, {useEffect} from "react";
import {useAppSelector} from "./MyRedux";
import "./I18n";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ReactTooltip from "react-tooltip";
import {useTranslation} from "react-i18next";
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import LoadingSpinner from "./Components/LoadingSpinner";
import Splash from "./Components/Splash";

const App = React.lazy(() => import("./App"));
const HomeScreen = React.lazy(() => import("./Pages/Home"));
const LaunchpadProjectDetailsScreen = React.lazy(() => import("./Pages/LaunchpadProjectDetails"));
const NotFoundScreen = React.lazy(() => import("./Pages/NotFound"));

export default function Main() {
  const {i18n} = useTranslation();
  const {
    language,
    loadingSpinner
  } = useAppSelector((state) => state);

  /**
   * Fix React-tooltip not shown sometimes
   * Fix React-tooltip doesn't show on conditional render
   * https://stackoverflow.com/questions/62043514/react-tooltip-doesnt-show-on-conditional-render
   * https://github.com/wwayne/react-tooltip#3-tooltip-not-binding-to-dynamic-content
   */
  useEffect(() => (ReactTooltip as any).rebuild());

  /**
   * Only change the language if the current language is different from current language that
   * saving in "redux store"
   */
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, []);

  return (
    <HelmetProvider>

      <BrowserRouter>
        <React.Suspense fallback={<Splash />} >
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomeScreen />} />
              <Route path="launchpad/:id" element={<LaunchpadProjectDetailsScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>

      <ToastContainer pauseOnFocusLoss={false} autoClose={5000} />

      <ReactTooltip
        className="react-tooltip-my-custom"
        html={false} // Must be false because You can't use "multiline: true" combine with "html: true"
        multiline={true}
        border={true}
        borderColor="rgb(81, 192, 225)"
        backgroundColor="#000"
        textColor="rgb(81, 192, 225)"
      />

      {
        loadingSpinner && <LoadingSpinner />
      }
    </HelmetProvider>
  );
}
