import React, {useState} from "react";
import style from "./index.module.scss";
import {ProgressBar} from "react-bootstrap";
import {CommonUtility} from "@/Utilities";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {AptospadBusinessService} from "@/Services/AptospadBusiness.service";
import {LoadingSpinnerActions, useAppDispatch} from "@/MyRedux";
import {toast} from "react-toastify";

export default function Buy() {
  const [amountAPT, setAmountAPT] = useState<string>("");
  const aptosWalletAdapter = useWallet();
  const dispatch = useAppDispatch();

  async function handleBuyToken() {
    try {
      if (!aptosWalletAdapter.connected) {
        throw new Error("Please connect wallet");
      }
      if (!amountAPT) {
        return toast.error("Please enter amount APT");
      }
      console.log("Buy aptospad with " + amountAPT + " APT...");

      const aptosPadService = new AptospadBusinessService(aptosWalletAdapter);
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(true));
      const response = await aptosPadService.bidAptosPad(BigInt(amountAPT));

      console.log("Result after buy APD: " + response);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setAmountAPT("");
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(false));
    }
  }

  return (
    <div id={style["buy-test"]} className="py-5">
      <div className="bg"></div>

      <div className="main-content container">
        <h1 className="text-center text-green-1 mb-5">Test AptosPad Token Sale</h1>
        <div className="row mb-5">
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="row">
                    <div className="col-6">Token Price:</div>
                    <div className="col-6">$0.02</div>
                    <div className="col-6">Max allocation:</div>
                    <div className="col-6">$500</div>
                    <div className="col-6">Ticket Price:</div>
                    <div className="col-6">$50</div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="row">
                    <div className="col-6">Your ticket:</div>
                    <div className="col-6">2</div>
                    <div className="col-6">Min Buy:</div>
                    <div className="col-6">$50 <span className="text-green-1">~ 15 APT</span></div>
                    <div className="col-6">Max Buy:</div>
                    <div className="col-6">$100 <span className="text-green-1">~ 30 APT</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block-1__3 col-12 col-md-6">
            <h1 className="h4">Fundraise goal</h1>
            <h3 className="h1">$1,000,000</h3>
            <ProgressBar className="goal-progress mb-3" now={11} label={`${11}%`}/>
            <h5>16,938/250,000 APT</h5>
          </div>
        </div>

        <div id="block-2">
          <div className="card-header">
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-6">Your address:</div>
                  <div className="col-6">{CommonUtility.stringEllipsisMiddle("0xa12857ab7999f85")}</div>
                  <div className="col-6">Your balance:</div>
                  <div className="col-6">1243.14 APT</div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-center align-items-center text-green-1 h3">
                1 APT = 50 APD
              </div>
            </div>
          </div>

          <div className="card-body">
            <form>
              <div id="buy-form">
                <div id="amount">
                  <label className="text-green-1 mb-1">Amount APT</label>
                  <div className="fake-input">
                    <input
                      type="text"
                      value={amountAPT}
                      onChange={(e) => setAmountAPT(e.currentTarget.value)}
                    />
                    <button type="button" className="btn ms-2">Max</button>
                  </div>
                </div>
                <img id="arrow-right" src="/images/arrow-right-icon.svg" alt=""/>
                <div id="receive">
                  <label className="text-green-1 mb-1">Get APD</label>
                  <div className="fake-input ps-3 pe-3">
                    <input type="text" disabled/>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button onClick={handleBuyToken} type="button" className="btn btn-gradient-blue w-50 fw-bold">
                  Buy Token
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
