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
import {useAppDispatch, useAppSelector} from "@/MyRedux";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import {CommonUtility} from "@/Utilities";

export default function WalletInteract() {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  let copiedAddress = false;

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
      <div className="not-connect">
        <button
          className="cbtn cbtn-outline-gradient-blue"
        >
          <img src="/images/wallet.svg" className="me-2" alt="wallet" style={{"width": "20px"}} />
          {t("connect wallet")}
        </button>
      </div>

    </div>
  );
}
