import React, {useEffect, useState} from "react";
import style from "./index.module.scss";
import {ProgressBar} from "react-bootstrap";
import {CommonUtility} from "@/Utilities";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {AptospadBusinessService, AptospadBuyView, LaunchPadRegistry} from "@/Services/AptospadBusiness.service";
import {LoadingSpinnerActions, useAppDispatch} from "@/MyRedux";
import {toast} from "react-toastify";
import {Alert} from "@/Components/Alert";

export default function Buy() {
  const walletContext = useWallet();
  const dispatch = useAppDispatch();

  const [amountAPTBid, setAmountAPTBid] = useState<string>("");
  const [apdService, setApdService] = useState<AptospadBusinessService>(new AptospadBusinessService(walletContext));
  const [aptBalanceOfUser, setAptBalanceOfUser] = useState<number>(0);
  const [totalBid, setTotalBid] = useState<number>(0);
  const [hardCap, setHardCap] = useState<number>(0);
  const [yourInvestment, setYourInvestment] = useState<number>(0);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [maxAllocation, setMaxAllocation] = useState<number>(500);
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [minBuy, setMinBuy] = useState<number>(0.1);
  const [maxBuy, setMaxBuy] = useState<number>(100);
  const [aptToApdRate, setAptToApdRate] = useState<number>(100);
  const [aptPrice, setAptPrice] = useState<number>(0);
  const [yourTicket, setYourTicket] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (walletContext.connected) {
        try {
          setApdService(new AptospadBusinessService(walletContext));
          const userAddress = walletContext.account?.address as string;

          const balanceOfUser = await apdService.getAptosBalanceOf(userAddress);
          setAptBalanceOfUser(Number(balanceOfUser) / Math.pow(10, 8));

          const config = await apdService.getApttSwapConfig();
          setHardCap((config.hardCap || 0) / Math.pow(10, 8));
          setAptToApdRate(config.aptToApttRate);

          const registry = await apdService.getLaunchPadRegistry();
          setTotalBid((registry.totalBid || 0) / Math.pow(10, 8));

          const aptPrice = (await apdService.loadPriceOfAPT()).price;
          setAptPrice(Number(aptPrice));
          setTokenPrice(Number(aptPrice) / aptToApdRate);

          await getTokenDistribute();
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    })();
  }, [walletContext]);

  const getTokenDistribute = async () => {
    try {
      setYourInvestment(0);
      const response = await apdService.tokenDistribute(walletContext.account?.address as string);
      setYourInvestment((response?.bid || 0) / Math.pow(10, 8));
      setYourTicket(response?.cap || 0);

      return true;
    } catch (error: any) {
      return false;
    }
  };

  function isValidAmountAPTBid(): boolean {
    const amountBid = Number(amountAPTBid);

    return amountBid < minBuy || amountBid > maxBuy || amountBid >= aptBalanceOfUser;
  }

  function fillMaxAmountBid() {
    if (Number(amountAPTBid) <= aptBalanceOfUser) {
      setAmountAPTBid(String(Math.floor(aptBalanceOfUser)));
    } else {
      setAmountAPTBid(String(maxBuy));
    }
  }

  async function handleBuyToken() {
    try {
      if (!walletContext.connected) {
        throw new Error("Please connect wallet");
      }
      if (!amountAPTBid) {
        return toast.error("Please enter amount APT");
      }
      if (totalBid > hardCap) {
        return toast.error("Can't buy APD because total bid has been reached.");
      }
      if (Number(amountAPTBid) > aptBalanceOfUser) {
        return toast.error("Not enough wallet balance.");
      }
      console.log("Buy aptospad with " + amountAPTBid + " APT...");

      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(true));
      const bigBidAmount = Math.fround(Number(amountAPTBid) * Math.pow(10, 8));

      const response = await apdService.bidAptosPad(BigInt(bigBidAmount));
      console.log("Result after buy APD: " + JSON.stringify(response));
      if (response && response.hash) {
        await getTokenDistribute();
        dispatch(LoadingSpinnerActions.toggleLoadingSpinner(false));
        await Alert(<p className="text-success">You used {amountAPTBid} APT to
          buy {Number(amountAPTBid) * aptToApdRate} APD</p>);
      }
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
        <h1 className="text-center text-green-1 mb-5">AptosPad Token Sale</h1>
        <div className="row mb-5">
          <div className="col-12 col-md-6">
            <div className="row h-100">
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="row">
                    <div className="col-6">Token Price:</div>
                    <div className="col-6">${tokenPrice.toFixed(3)}</div>
                    <div className="col-6">Max allocation:</div>
                    <div className="col-6">${Math.round(maxBuy * aptPrice)} <span
                      className="text-green-1">~ 100 APT</span>
                    </div>
                    <div className="col-6">Ticket Price:</div>
                    <div className="col-6">${ticketPrice}</div>
                  </div>
                </div>
              </div>
              <div className="col-12 align-self-end">
                <div className="card">
                  <div className="row">
                    <div className="col-6">Your ticket:</div>
                    <div className="col-6">{yourTicket}</div>
                    <div className="col-6">Min Buy:</div>
                    <div className="col-6">{minBuy}<span className="text-green-1"> APT</span></div>
                    <div className="col-6">Max Buy:</div>
                    <div className="col-6">{maxBuy}<span className="text-green-1"> APT</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row h-100">
              <div id="block-1__3" className="col-12 mb-4">
                <h1 className="h4">Fundraising Goals</h1>
                <h3 className="h1">${Intl.NumberFormat().format(Math.fround(hardCap * aptPrice))}</h3>
                <ProgressBar
                  className="goal-progress mb-3"
                  now={`${hardCap === 0 ? 0 : Number((totalBid || 0) * 100 / hardCap).toFixed(1)}` as any}
                  label={`${hardCap === 0 ? 0 : Number(Math.min((totalBid || 0) * 100 / hardCap, 100)).toFixed(1)}%`}
                />
                <h5 className="mb-0">
                  {Intl.NumberFormat().format(totalBid)} / {Intl.NumberFormat().format(hardCap)}
                  <span className="text-green-1"> APT</span>
                </h5>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="row">
                    <div className="col-6">Your investment:</div>
                    <div
                      className="col-6 text-green-1">{yourInvestment ? `${yourInvestment} APT` : "Na"}</div>
                    <div className="col-6">Token distribution Time:</div>
                    <div className="col-6 text-green-1">December 2nd, 2022 <br/> 5:00 PM - UTC</div>
                  </div>
                </div>
              </div>
            </div>
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
                      walletContext.connected
                        ? <a
                          className="text-info"
                          href={`https://explorer.aptoslabs.com/account/${walletContext.account?.address}?network=testnet`}
                          target="_blank" rel="noreferrer"
                        >
                          {CommonUtility.stringEllipsisMiddle(walletContext.account?.address as string)}
                        </a>
                        : ""
                    }
                  </div>
                  <div className="col-6">Your balance:</div>
                  <div className="col-6">{aptBalanceOfUser?.toFixed(2)}<span
                    className="text-green-1"> APT</span>
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-center align-items-center text-green-1 h3">
                1 APT = {aptToApdRate} APD
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
                    <button onClick={() => fillMaxAmountBid()} type="button" className="btn ms-2">
                      Max
                    </button>
                  </div>
                </div>
                <img id="arrow-right" src="/images/arrow-right-icon.svg" alt=""/>
                <div id="receive">
                  <label className="text-green-1 mb-1">Get APD</label>
                  <div className="fake-input ps-3 pe-3">
                    <input
                      type="text" disabled
                      value={Intl.NumberFormat().format(Number(amountAPTBid) * aptToApdRate)}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button disabled={isValidAmountAPTBid()} onClick={handleBuyToken} type="button" className="btn btn-gradient-blue w-50 fw-bold">
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
