import React, {useEffect} from "react";
import "./App.scss";
import {Outlet, useLocation, useSearchParams} from "react-router-dom";
import {useAppSelector, useAppDispatch} from "./MyRedux";
import {CookieUtility} from "./Utilities";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import moment from "moment";
import {WalletService} from "./Services";
import Header from "./Components/Header";
import HeaderBottom from "./Components/HeaderBottom";
import Footer from "./Components/Footer";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const aptosWalletAdapter = useWallet();

  React.useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      const expiredTime = moment().add(30, "days").unix() * 1000;
      CookieUtility.clientSetCookie("ref", ref, expiredTime);
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (aptosWalletAdapter.account) {
      const account = aptosWalletAdapter.account;
      const referrer = CookieUtility.clientGetCookieByName("ref");
      if (referrer) {
        (async () => {
          try {
            const signReferral = async () => {
              const response: any = await aptosWalletAdapter.signMessage({
                "message": `${referrer}`,
                "nonce": "referral"
              } as any);

              WalletService.addReferral({
                "public_key": account.publicKey as any,
                "address": account.address as any,
                "signature": response.signature,
                "referrer": referrer
              });
            };
            const response1 = await WalletService.getReferralInfo(account.address as any);
            const response1Result = response1.data.data;
            if (response1Result) {
              if (response1Result.referrer) {
                CookieUtility.clientDeleteCookieByName("ref");
              } else {
                CookieUtility.clientDeleteCookieByName("ref");
                signReferral();
              }
            } else {
              CookieUtility.clientDeleteCookieByName("ref");
              signReferral();
            }
          } catch (error: any) {
            // Do nothhing
          }
        })();
      }
    }
  }, [aptosWalletAdapter.connected]);

  return (
    <div id="App">
      <Header />

      <div id="app-content">
        <Outlet />

        <Footer />
      </div>

      <HeaderBottom />
    </div>
  );
}

export default App;
