import React, {useState, useEffect, useRef} from "react";
import style from "./index.module.scss";
import {Link} from "react-router-dom";
import {ReactComponent as TelegramIcon} from "@/Assets/Images/Social/Telegram.svg";
import {ReactComponent as TwitterIcon} from "@/Assets/Images/Social/Twitter.svg";
import {ReactComponent as SpeakerIcon} from "@/Assets/Images/Social/Speaker.svg";
import {ReactComponent as DiscordIcon} from "@/Assets/Images/Social/Discord.svg";
import {ReactComponent as GlobalIcon} from "@/Assets/Images/Social/Global.svg";
import {ReactComponent as PaperIcon} from "@/Assets/Images/Social/Paper.svg";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {useAppDispatch, useAppSelector, TransactionSettingsActions, PopupsActions} from "@/MyRedux";
import {CommonUtility, CustomHookUtility} from "@/Utilities";
import {toast} from "react-toastify";

interface ITF_DefaultForm {
  pay: string;
  paySymbol: string;
  receive: string;
  receiveSymbol: string;
}

export default function Swap() {
  const dispatch = useAppDispatch();
  const walletAdapter = useWallet();
  const popups = useAppSelector((state) => state.popups);
  const transactionSettings = useAppSelector((state) => state.transactionSettings);
  const refPay = useRef(null);
  CustomHookUtility.useOnClickOutside(refPay, () => (refPay.current as any)?.classList.remove(style["expand"]));
  const refReceive = useRef(null);
  CustomHookUtility.useOnClickOutside(refReceive, () => (refReceive.current as any)?.classList.remove(style["expand"]));
  const defaultForm: ITF_DefaultForm = {
    "pay": "",
    "paySymbol": "",
    "receive": "",
    "receiveSymbol": ""
  };
  const [form, setForm] = useState<ITF_DefaultForm>(defaultForm);

  const toggleCoinList = (which: "pay" | "receive") => {
    if (which === "pay") {
      (refReceive.current as any).classList.remove(style["expand"]);
      (refPay.current as any).classList.toggle(style["expand"]);
    } else {
      (refPay.current as any).classList.remove(style["expand"]);
      (refReceive.current as any).classList.toggle(style["expand"]);
    }
  };

  const openChooseWalletPopup = () => {
    walletAdapter.disconnect();
    dispatch(PopupsActions.togglePopup({"popupName": "chooseWallet", "display": true}));
  };

  const onSwapIconClicked = () => {
    const pay = form.receive;
    const receive = form.pay;

    setForm({...form, ...{pay, receive}});
  };

  const onSwapButtonClicked = () => {
    console.log(form, transactionSettings);
  };

  const onSelectCoin = (type: "pay" | "receive", item: any) => {
    // if (type === "pay") {
    //   if (item.symbol === form.receive.symbol) {
    //     const pay = item;
    //     const receive = form.pay;
    //     setForm({...form, ...{pay, receive}});
    //   } else {
    //     setForm({...form, [type]: item});
    //   }
    // } else {
    //   if (item.symbol === form.pay.symbol) {
    //     const pay = form.receive;
    //     const receive = item;
    //     setForm({...form, ...{pay, receive}});
    //   } else {
    //     setForm({...form, [type]: item});
    //   }
    // }

    (refReceive.current as any).classList.remove(style["expand"]);
    (refPay.current as any).classList.remove(style["expand"]);
  };

  const onInputChange = (type: "pay" | "receive", value: string) => {
    if (CommonUtility.allowSixDigitsAfterDecimalPoint(value)) {
      if (type === "pay") {
        const payAmount = value;
        const receiveAmount = (parseFloat(value) * 2).toString();
        setForm({...form, ...{payAmount, receiveAmount}});
      } else {
        const receiveAmount = value;
        const payAmount = (parseFloat(value) / 2).toString();
        setForm({...form, ...{payAmount, receiveAmount}});
      }
    }
  };

  return (
    <div id={style["swap"]} className="container">
      <form className={style["form"]}>

        <div className={`${style["input-has-select"]}`} ref={refPay}>
          <label htmlFor="pay" className="text-green-1 text-uppercase mb-2 ms-2" role="button">Pay</label>
          <div className={style["wrap"]}>
            <div className={style["select"]} onClick={() => toggleCoinList("pay")}>
              <div className={style["line-1"]}>
                <img src="/images/network-binanceSmartChain-color-icon.svg" alt="" />
                <span>Value 1</span>
              </div>

              {
                walletAdapter.connected && <div className={style["line-2"]}>Balance</div>
              }
            </div>
            <div className={style["input"]}>
              <div className={style["line-1"]}>
                <input id="pay" type="text" placeholder="0.00" />
              </div>

              {
                walletAdapter.connected && <div className={style["line-2"]}>{CommonUtility.commaFormatter("1000")}</div>
              }
            </div>
          </div>
          <div className={style["wrap-options"]}>
            <ul className={style["options"]}>
              <li className={style["option"]}>
                <img src="/images/network-binanceSmartChain-color-icon.svg" alt="" />
                <div className={style["token"]}>
                  <p className={style["symbol"]}>APD</p>
                  <p className={style["name"]}>AptosPad Token</p>
                </div>
              </li>
              <li className={style["option"]}>
                <img src="/images/network-binanceSmartChain-color-icon.svg" alt="" />
                <div className={style["token"]}>
                  <p className={style["symbol"]}>APD</p>
                  <p className={style["name"]}>AptosPad Token</p>
                </div>
              </li>
              <li className={style["option"]}>
                <img src="/images/network-binanceSmartChain-color-icon.svg" alt="" />
                <div className={style["token"]}>
                  <p className={style["symbol"]}>APD</p>
                  <p className={style["name"]}>AptosPad Token</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <img className={style["swap-icon"]} src="/images/swap.svg" alt="" />

        <div className={`${style["input-has-select"]}`} ref={refReceive}>
          <label htmlFor="receive" className="text-green-1 text-uppercase mb-2 ms-2" role="button">Receive</label>
          <div className={style["wrap"]}>
            <div className={style["select"]} onClick={() => toggleCoinList("receive")}>
              <div className={style["line-1"]}>
                <img src="/images/network-binanceSmartChain-color-icon.svg" alt="" />
                <span>Value 1</span>
              </div>
              {
                walletAdapter.connected && <div className={style["line-2"]}>Balance</div>
              }

            </div>
            <div className={style["input"]}>
              <div className={style["line-1"]}>
                <input id="receive" type="text" placeholder="0.00" />
              </div>

              {
                walletAdapter.connected && <div className={style["line-2"]}>{CommonUtility.commaFormatter(2000)}</div>
              }
            </div>
          </div>
          <div className={style["wrap-options"]}>
            <ul className={style["options"]}>
              <li className={style["option"]}>
                <img src="/images/network-binanceSmartChain-color-icon.svg" alt="" />
                <div className={style["token"]}>
                  <p className={style["symbol"]}>APD</p>
                  <p className={style["name"]}>AptosPad Token</p>
                </div>
              </li>
              <li className={style["option"]}>
                <img src="/images/network-binanceSmartChain-color-icon.svg" alt="" />
                <div className={style["token"]}>
                  <p className={style["symbol"]}>APD</p>
                  <p className={style["name"]}>AptosPad Token</p>
                </div>
              </li>
              <li className={style["option"]}>
                <img src="/images/network-binanceSmartChain-color-icon.svg" alt="" />
                <div className={style["token"]}>
                  <p className={style["symbol"]}>APD</p>
                  <p className={style["name"]}>AptosPad Token</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`${style["slip"]} ms-2 mt-1 mb-5 text-green-1 fw-bold`}
          role="button"
          onClick={() => dispatch(PopupsActions.togglePopup({"popupName": "transactionSettings", "display": true}))}
        >
          Slip {transactionSettings.slippage}%
          <i className="fa fa-sliders ms-2" aria-hidden="true"></i>
        </div>

        <div className="d-flex justify-content-center">
          {
            !walletAdapter.connected && (
              <button
                className={`${style["butons"]} cbtn cbtn-lg cbtn-outline-gradient-blue`}
                type="button"
                onClick={() => openChooseWalletPopup()}
              >
                Connect to Wallet
              </button>
            )
          }

          {
            (walletAdapter.connected && !form.pay) && (
              <button
                className={`${style["butons"]} cbtn cbtn-lg cbtn-outline-gradient-blue`}
                type="button"
                onClick={() => {}}
              >
                Enter an Amount
              </button>
            )
          }

          {
            (walletAdapter.connected && form.pay && form.receive) && (
              <button
                className={`${style["butons"]} cbtn cbtn-lg cbtn-outline-gradient-blue`}
                type="button"
                onClick={() => {}}
              >
                Swap
              </button>
            )
          }
        </div>
      </form>

      <div className={style["icons"]}>
        <a href={process.env.TELEGRAM} target="_blank" rel="noreferrer">
          <TelegramIcon className={style["icon"]} />
        </a>
        <a href={process.env.TWITTER} target="_blank" rel="noreferrer">
          <TwitterIcon className={style["icon"]} />
        </a>
        <a href={process.env.DISCORD} target="_blank" rel="noreferrer">
          <DiscordIcon className={style["icon"]} />
        </a>
        <a href={"/"} target="_blank" rel="noreferrer">
          <GlobalIcon className={style["icon"]} />
        </a>
        <a href={"/"} target="_blank" rel="noreferrer">
          <PaperIcon className={style["icon"]} />
        </a>
      </div>
    </div>
  );
}
