import React, {useEffect} from "react";
import {useAppSelector} from "./MyRedux";
import "./I18n";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ReactTooltip from "react-tooltip";
import {useTranslation} from "react-i18next";
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter, Routes, Route} from "react-router-dom";
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
  SafePalWalletAdapter,
  SpacecyWalletAdapter
  // FoxWalletAdapter,
  // CloverWalletAdapter
} from "@manahippo/aptos-wallet-adapter";

import LoadingSpinner from "./Components/LoadingSpinner";
import ChooseWalletPopup from "./Components/ChooseWalletPopup";
import PopupReferral from "./Components/PopupReferral";
import PopupTransactionSettings from "./Components/PopupTransactionSettings";

const Splash = React.lazy(() => import("./Components/Splash"));
const App = React.lazy(() => import("./App"));
const HomeScreen = React.lazy(() => import("./Pages/Home"));
const ProjectsScreen = React.lazy(() => import("./Pages/Projects"));
const ProjectDetailsScreen = React.lazy(() => import("./Pages/ProjectDetails"));
const ProjectDetails2Screen = React.lazy(() => import("./Pages/ProjectDetails2"));
const StakingScreen = React.lazy(() => import("./Pages/Staking"));
const CommunityVotingScreen = React.lazy(() => import("./Pages/CommunityVoting"));
const GovernanceScreen = React.lazy(() => import("./Pages/Governance"));
const SwapScreen = React.lazy(() => import("./Pages/Swap"));
const PortfolioScreen = React.lazy(() => import("./Pages/Portfolio"));
const BuyScreen = React.lazy(() => import("./Pages/Buy"));
const BuyTestScreen = React.lazy(() => import("./Pages/BuyTest"));
const NotFoundScreen = React.lazy(() => import("./Pages/NotFound"));

export default function Main() {
  const {i18n} = useTranslation();
  const {
    language,
    loadingSpinner,
    popups
  } = useAppSelector((state) => state);
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
    new SafePalWalletAdapter(),
    new SpacecyWalletAdapter()
    // new FoxWalletAdapter()
    // new CloverWalletAdapter()
  ];

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
    <WalletProvider
      wallets={wallets}
      autoConnect={true}
      onError={(error: Error) => {
        toast.error(error.message);
      }}>
      <HelmetProvider>

        <BrowserRouter>
          <React.Suspense fallback={<Splash />} >
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomeScreen />} />
                <Route path="ido-projects" element={<ProjectsScreen />} />
                <Route path="projects/:id" element={<ProjectDetailsScreen />} />
                <Route path="project/:id" element={<ProjectDetails2Screen />} />
                <Route path="staking" element={<StakingScreen />} />
                <Route path="community-voting" element={<CommunityVotingScreen />} />
                <Route path="governance" element={<GovernanceScreen />} />
                <Route path="swap" element={<SwapScreen />} />
                <Route path="portfolio" element={<PortfolioScreen />} />
                <Route path="buy" element={<BuyScreen />} />
                <Route path="buy-test" element={<BuyTestScreen />} />
                <Route path="*" element={<NotFoundScreen />} />
              </Route>
            </Routes>
          </React.Suspense>
        </BrowserRouter>

        <ToastContainer pauseOnFocusLoss={false} autoClose={5000} />

        <ReactTooltip
          className="react-tooltip-my-custom"
          html={true} // Must be false because You can't use "multiline: true" combine with "html: true"
          multiline={false}
          border={true}
          borderColor="rgb(81, 192, 225)"
          backgroundColor="#000"
          textColor="rgb(81, 192, 225)"
          effect="solid"
          clickable={true}
          delayHide={500}
        />

        {
          popups.chooseWallet.display && <ChooseWalletPopup />
        }
        {
          popups.referral.display && <PopupReferral />
        }
        {
          popups.transactionSettings.display && <PopupTransactionSettings />
        }

        {
          loadingSpinner && <LoadingSpinner />
        }
      </HelmetProvider>
    </WalletProvider>
  );
}
