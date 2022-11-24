/**
 * Allow websites to request users' Binance Smart Chain addresses, read data
 * from the blockchain the user is connected to, and prompt the users to sign messages and
 * transactions
 *
 * References:
 * https://docs.binance.org/smart-chain/wallet/wallet_api.html
 *
 */

import React from "react";
import "./index.scss";
import {useAppDispatch, useAppSelector, WalletActions, PopupsActions} from "@/MyRedux";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import {CommonUtility} from "@/Utilities";
import {useWallet} from "@manahippo/aptos-wallet-adapter";

export default function WalletInteract() {
  const dispatch = useAppDispatch();
  const aptosWalletAdapter = useWallet();
  const {wallet, popups} = useAppSelector((state) => state);
  const {t} = useTranslation();
  let copiedAddress = false;

  const openChooseWalletPopup = () => {
    aptosWalletAdapter.disconnect();
    dispatch(PopupsActions.togglePopup({"popupName": "chooseWallet", "display": true}));
  };

  const copyTextToClipboard = async (value: string) => {
    if (!copiedAddress) {
      navigator.clipboard.writeText(value.trim());
      copiedAddress = true;
      toast.success("Wallet address copied to Clipboard.", {"autoClose": 2000});
      setTimeout(() => {
        copiedAddress = false;
      }, 2000);
    }
  };

  return (
    <div id="wallet-interact">
      {
        aptosWalletAdapter.connected
          ? <div className="connected d-flex align-items-center">
            <span className="wallet-account-address"
              onClick={() => copyTextToClipboard(aptosWalletAdapter.account!.address as any)}
            >
              {CommonUtility.stringEllipsisMiddle(aptosWalletAdapter.account!.address as any)}
            </span>

            <React.Fragment>
              <img src="/images/network-aptos.png" className="network-icon ms-2 me-1" alt="wallet" />
              <span className="network-name">Aptos</span>
            </React.Fragment>

            <div className="bound">
              <div className="actions">
                <div className="action" onClick={() => aptosWalletAdapter.disconnect()}>{t("disconnect")}</div>
              </div>
            </div>
          </div>
          : <div className="not-connect">
            <button
              className="cbtn cbtn-outline-gradient-blue"
              disabled={popups.chooseWallet.display}
              onClick={() => openChooseWalletPopup()}
            >
              <img src="/images/wallet.svg" className="me-2" alt="wallet" style={{"width": "20px"}} />
              {t("connect wallet")}
            </button>
          </div>
      }

    </div>
  );
}
