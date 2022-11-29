import React, {useEffect, useState} from "react";
import style from "./index.module.scss";
import {ProgressBar} from "react-bootstrap";
import {CommonUtility} from "@/Utilities";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {AptospadBusinessService, ApttSwapConfig, LaunchPadRegistry} from "@/Services/AptospadBusiness.service";
import {LoadingSpinnerActions, useAppDispatch} from "@/MyRedux";
import {toast} from "react-toastify";

export default function Buy() {
  const walletContext = useWallet();
  const dispatch = useAppDispatch();

  const [amountAPTBid, setAmountAPTBid] = useState<string>("");
  const [apdService, setApdService] = useState<AptospadBusinessService>(new AptospadBusinessService(walletContext));
  const [aptBalanceOfUser, setAptBalanceOfUser] = useState<string>("");
  const [apdConfig, setApdConfig] = useState<ApttSwapConfig>({"aptToApttRate": 0});
  const [launchPadRegistry, setLaunchPadRegistry] = useState<LaunchPadRegistry>({"totalBid": 0});
  const [minBuy, setMinBuy] = useState<number>(0.1);
  const [maxBuy, setMaxBuy] = useState<number>(100);
  const [hardCap, setHardCap] = useState<number>(0);
  const [aptPrice, setAptPrice] = useState<number>(0);
  const [tokenPrice, setTokenPrice] = useState<number>(0.02);
  const [ticketPrice, setTicketPrice] = useState<number>(50);
  const [maxAllocation, setMaxAllocation] = useState<number>(500);
  const [yourTicket, setYourTicket] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (walletContext.connected) {
        try {
          const userAddress = walletContext.account?.address as string;
          const octaBalance = await apdService.getAptosBalanceOf(userAddress);
          const aptBalance = Number(octaBalance) / Math.pow(10, 8);
          setAptBalanceOfUser(String(aptBalance));
          setApdService(new AptospadBusinessService(walletContext));

          const config = await apdService.getApttSwapConfig();
          setApdConfig(config || apdConfig);
          setHardCap(config.hardCap || hardCap);

          const registry = await apdService.getLaunchPadRegistry();
          setLaunchPadRegistry(registry || launchPadRegistry);

          const aptPrice = (await apdService.loadPriceOfAPT()).price;
          setAptPrice(Number(aptPrice));
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    })();
  }, [walletContext]);

  function isValidAmountAPTBid() {
    return Number(amountAPTBid) < minBuy || Number(amountAPTBid) > maxBuy;
  }

  async function handleBuyToken() {
    try {
      if (!walletContext.connected) {
        throw new Error("Please connect wallet");
      }
      if (!amountAPTBid) {
        return toast.error("Please enter amount APT");
      }
      console.log("Buy aptospad with " + amountAPTBid + " APT...");

      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(true));
      const response = await apdService.bidAptosPad(BigInt(Number(amountAPTBid) * Math.pow(10, 8)));
      console.log("Result after buy APD: " + response);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setAmountAPTBid("");
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(false));
    }
  }

  return (
    <div id={style["buy-test"]} className="py-5">
      <div className="bg"/>

      <div className="main-content container">
        <h1 className="text-center text-green-1 mb-5">Test AptosPad Token Sale</h1>
        <div className="row mb-5">
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="row">
                    <div className="col-6">Token Price:</div>
                    <div className="col-6">${tokenPrice}</div>
                    <div className="col-6">Max allocation:</div>
                    <div className="col-6">${maxAllocation} <span
                      className="text-green-1">~ 15 APT</span>
                    </div>
                    <div className="col-6">Ticket Price:</div>
                    <div className="col-6">${ticketPrice}</div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="row">
                    <div className="col-6">Your ticket:</div>
                    <div className="col-6">{yourTicket === 0 ? `Na` : yourTicket}</div>
                    <div className="col-6">Min Buy:</div>
                    <div className="col-6">{minBuy}<span className="text-green-1"> APT</span></div>
                    <div className="col-6">Max Buy:</div>
                    <div className="col-6">{maxBuy}<span className="text-green-1"> APT</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block-1__3 col-12 col-md-6">
            <h1 className="h4">Fundraising Goals</h1>
            <h3 className="h1">$2,000,000</h3>
            {/* <h3 className="h1">${Intl.NumberFormat().format(aptPrice * hardCap / Math.pow(10, 8))}</h3> */}
            <ProgressBar className="goal-progress mb-3" now={10} label={`${hardCap === 0 ? 0 : Number(launchPadRegistry.totalBid * 100 / 400_000_000_000_00).toFixed(1)}%`}/>
            <h5>
              {Intl.NumberFormat().format(launchPadRegistry.totalBid / Math.pow(10, 8))} / 400,000
              <span className="text-green-1"> APT</span>
            </h5>
          </div>
        </div>

        <div id="block-2">
          <div className="card-header">
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-6">Your address:</div>
                  <div className="col-6">
                    {
                      walletContext.connected ? CommonUtility.stringEllipsisMiddle(walletContext.account?.address as string) : ""
                    }
                  </div>
                  <div className="col-6">Your balance:</div>
                  <div className="col-6">{Number(aptBalanceOfUser).toFixed(2)}<span className="text-green-1"> APT</span>
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-center align-items-center text-green-1 h3">
                1 APT = {apdConfig.aptToApttRate} APD
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
                      type="number"
                      placeholder={`Enter amount in range ${minBuy} ~ ${maxBuy}`}
                      value={amountAPTBid}
                      onChange={(e) => setAmountAPTBid(e.currentTarget.value)}
                    />
                    <button onClick={() => setAmountAPTBid(String(maxBuy))} type="button" className="btn ms-2">Max
                    </button>
                  </div>
                </div>
                <img id="arrow-right" src="/images/arrow-right-icon.svg" alt=""/>
                <div id="receive">
                  <label className="text-green-1 mb-1">Get APD</label>
                  <div className="fake-input ps-3 pe-3">
                    <input
                      type="text" disabled
                      value={Intl.NumberFormat().format(Number(amountAPTBid) * apdConfig.aptToApttRate)}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button disabled={isValidAmountAPTBid()} onClick={handleBuyToken} type="button"
                  className="btn btn-gradient-blue w-50 fw-bold">
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
