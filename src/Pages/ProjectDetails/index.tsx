import React, {useState} from "react";
import style from "./index.module.scss";
import {useParams, Link} from "react-router-dom";
import {Carousel, Tabs, Tab} from "react-bootstrap";
import Countdown from "@/Components/Countdown";
import {ReactComponent as TelegramIcon} from "@/Assets/Images/Social/Telegram.svg";
import {ReactComponent as TwitterIcon} from "@/Assets/Images/Social/Twitter.svg";
import {ReactComponent as SpeakerIcon} from "@/Assets/Images/Social/Speaker.svg";
import {ReactComponent as DiscordIcon} from "@/Assets/Images/Social/Discord.svg";
import {ReactComponent as GlobalIcon} from "@/Assets/Images/Social/Global.svg";
import {ReactComponent as PaperIcon} from "@/Assets/Images/Social/Paper.svg";
import {AptospadBusinessService} from "@/Services/AptospadBusiness.service";
import {useWallet} from "@manahippo/aptos-wallet-adapter";

export default function LaunchpadProjectDetailsScreen() {
  const {id} = useParams();
  const [tab, setTab] = useState<"info" | "sale" | "join">("info");
  const aptosWalletAdapter = useWallet();

  async function handleBuyToken() {
    const aptosPadService = new AptospadBusinessService(aptosWalletAdapter);

    const amount = BigInt("10");
    const response = await aptosPadService.bidAptosPad(amount);

    console.log("Result after buy APD: " + response);
  }

  return (
    <div id={`${style["project-details"]}`}>
      <div className="bg"></div>
      <div className="container">
        <div className="row pb-5">
          <div id="project-common" className="col-12 col-md-6 order-2 order-sm-1">
            <div id="common">
              <h1>
                <strong>AptosPad</strong> | APD
              </h1>
              <p>Category: Launchpad</p>
              <div>
                <Link to={"/"} className="social">
                  <TelegramIcon className="icon" />
                </Link>
                <Link to={"/"} className="social">
                  <TwitterIcon className="icon" />
                </Link>
                <Link to="/" className="social">
                  <DiscordIcon className="icon" />
                </Link>
                <Link to="/" className="social">
                  <GlobalIcon className="icon" />
                </Link>
                <Link to="/" className="social">
                  <PaperIcon className="icon" />
                </Link>
              </div>
            </div>

            <div id="description">
              <h2 className="text">Description</h2>
              <p className="second-text">AptosPad is the launchpad platform on Aptos that accelerates future ideals by connecting the community, investors, and builders.</p>
            </div>
          </div>
          <div id="project-banner-carousel" className="col-12 col-md-6 order-1 order-sm-2">
            <Carousel fade={true} touch={true} slide={true} interval={5000}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://academy-public.coinmarketcap.com/optimized-uploads/92ac70eb0ab84ab5a400d804eac10cb2.png"
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://academy-public.coinmarketcap.com/optimized-uploads/149e3939ba1449f1980cf87f664ceec6.jpg"
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://academy-public.coinmarketcap.com/optimized-uploads/fd5589e77b4842b8b5632590a239c6e4.png"
                  alt=""
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        <div className="row">
          <div id="details" className="col-12 col-lg-6 pb-5">
            <div id="actions" className="d-flex justify-content-between pb-2">
              <button
                className={`${tab === "info" ? "active" : ""} cbtn cbtn-outline-gradient-blue`}
                onClick={() => setTab("info")}
              >
                Project Information
              </button>
              <button
                className={`${tab === "sale" ? "active" : ""} cbtn cbtn-outline-gradient-blue`}
                onClick={() => setTab("sale")}
              >
                Token Sale
              </button>
              <button
                className={`${tab === "join" ? "active" : ""} cbtn cbtn-outline-gradient-blue`}
                onClick={() => setTab("join")}
              >
                Join Whitelist
              </button>
            </div>
            <div id="details-content" className={`my-${tab}`}>
              {
                (() => {
                  if (tab === "info") {
                    return (
                      <>
                        <h3 className="text">Project Information</h3>
                        <p>AptosPad is the launchpad platform on  Aptos  that accelerates future ideals by connecting the community, investors, and builders.</p>
                      </>
                    );
                  } else if (tab === "sale") {
                    return (
                      <>
                        <h3 className="text">Early Sale Policies</h3>
                        <ul>
                          <li>
                            <p className="left">Total sale:</p>
                            <p className="right">2.000.000 APD</p>
                          </li>
                          <li>
                            <p className="left">Target raise:</p>
                            <p className="right">$200.000</p>
                          </li>
                          <li>
                            <p className="left">Min Amount:</p>
                            <p className="right">5 APD</p>
                          </li>
                          <li>
                            <p className="left">Max Amount:</p>
                            <p className="right">500 APD</p>
                          </li>
                        </ul>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <p className="text-center text-info mb-4">You must connect your Wallet and Discord to assist us in calculating the quantity of tickets you will be able to buy for each Discord role.</p>
                        <div className="join-condition">
                          <span className="left">Your Wallet:</span>
                          <span className="right">
                            <button
                              className={`cbtn cbtn-sm cbtn-outline-gradient-blue`}
                              onClick={() => {}}
                            >
                            Connect Wallet
                            </button>
                          </span>
                        </div>
                        <div className="join-condition">
                          <span className="left">Your Discord:</span>
                          <span className="right">
                            <button
                              className={`cbtn cbtn-sm cbtn-outline-gradient-blue`}
                              onClick={() => {}}
                            >
                            Connect Discord
                            </button>
                          </span>
                        </div>

                        <button
                          className={`cbtn cbtn-sm cbtn-outline-gradient-blue w-100 mt-5`}
                          onClick={() => {}}
                        >
                            Register
                        </button>
                      </>
                    );
                  }
                })()
              }
            </div>
          </div>
          <div id="buy-early" className="col-12 col-lg-6 pb-5">
            <h2 className="text mb-5 text-center">Buy Early Token</h2>

            <h5 className="text-center mb-0">Whitelist end in:</h5>
            <h3 className="d-flex justify-content-center fw-bold text-uppercase mb-3"><Countdown targetDate={"2022-11-30 03:05:00"} /></h3>

            <ul id="info">
              <li>
                <p className="left">Your address:</p>
                <p className="right">0xa12857ab6abf549943643cba467999f85</p>
              </li>
              <li>
                <p className="left">Your balance:</p>
                <p className="right">100 ATP</p>
              </li>
              <li>
                <p className="left">Token price:</p>
                <p className="right">$ 0.03</p>
              </li>
            </ul>

            <div id="buy-form">
              <div id="line-1">
                <div className="item">
                  <p className="text-top">Your ticket</p>
                  <p>20</p>
                </div>
                <div className="item">
                  <p className="text-top">Total Ticket</p>
                  <p>400</p>
                </div>
                <div className="item">
                  <p className="text-top">Min Token to Buy</p>
                  <p>20 APD</p>
                </div>
                <div className="item">
                  <p className="text-top">Max Token to Buy</p>
                  <p>500 APD</p>
                </div>
              </div>

              <div id="line-2">
                <form>
                  <div id="input-buy">
                    <div id="amount">
                      <input
                        type="text"
                        name="amount"
                      />
                    </div>

                    <img id="arrow-right" src="/images/arrow-right-icon.svg" alt="" />

                    <div id="receive">2 APD</div>
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
      </div>
    </div>
  );
}
