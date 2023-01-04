import React, {useState} from "react";
import style from "./index.module.scss";
import {useParams, Link} from "react-router-dom";
import {ReactComponent as TelegramIcon} from "@/Assets/Images/Social/Telegram.svg";
import {ReactComponent as TwitterIcon} from "@/Assets/Images/Social/Twitter.svg";
import {ReactComponent as SpeakerIcon} from "@/Assets/Images/Social/Speaker.svg";
import {ReactComponent as DiscordIcon} from "@/Assets/Images/Social/Discord.svg";
import {ReactComponent as GlobalIcon} from "@/Assets/Images/Social/Global.svg";
import {ReactComponent as PaperIcon} from "@/Assets/Images/Social/Paper.svg";
import {AptospadBusinessService} from "@/Services/AptospadBusiness.service";
import Slider, {Settings} from "react-slick";

export default function LaunchpadProjectDetailsScreen() {
  const {id} = useParams();
  const [settings, setSettings] = useState<Settings>({
    "dots": true,
    "infinite": false,
    "speed": 500,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "className": style["my-slider"]
  });

  return (
    <div id={`${style["project-details2"]}`}>
      <div className={style["bg"]}></div>

      <div className={`${style["container"]} container`}>
        <div className="row pb-5">
          <div id={style["block-1"]} className="col-12 col-md-5">
            <div className={style["card-info"]}>
              <h1 className="h3 mb-3">
                <strong>AptosPad</strong> <span className="mx-3">|</span> APD
              </h1>
              <div className={style["wrap-social"]}>
                Launchpad
                <div className={style["icons"]}>
                  <Link to={"/"}>
                    <TelegramIcon className={style["icon"]} />
                  </Link>
                  <Link to={"/"}>
                    <TwitterIcon className={style["icon"]} />
                  </Link>
                  <Link to="/">
                    <DiscordIcon className={style["icon"]} />
                  </Link>
                  <Link to="/">
                    <GlobalIcon className={style["icon"]} />
                  </Link>
                  <Link to="/">
                    <PaperIcon className={style["icon"]} />
                  </Link>
                </div>
              </div>
            </div>
            <div className={style["card-goal"]}>
              <h3 className="text-green-1">Fundraise goal</h3>
              <h1 className={style["goal"]}>$1,000,000</h1>
              <button className={`btn ${style["btn-buy"]}`}>Buy Early Token</button>
            </div>

            <div className={style["card-sale-details"]}>
              <h3 className="text-green-1 mb-3">Token sale</h3>
              <ul className={style["list"]}>
                <li className={style["item"]}>
                  <p className={style["left"]}>Token price:</p>
                  <p className={style["right"]}>$0,02</p>
                </li>
                <li className={style["item"]}>
                  <p className={style["left"]}>Max allocation:</p>
                  <p className={style["right"]}>$500</p>
                </li>
                <li className={style["item"]}>
                  <p className={style["left"]}>Ticket price:</p>
                  <p className={style["right"]}>$50</p>
                </li>
                <li className={style["item"]}>
                  <p className={style["left"]}>Start time:</p>
                  <p className={style["right"]}>
                    December 14th, 2022 <br/> 1:00 PM-UTC
                  </p>
                </li>
                <li className={style["item"]}>
                  <p className={style["left"]}>End time:</p>
                  <p className={style["right"]}>
                    December 14th, 2022 <br/> 5:00 PM-UTC
                  </p>
                </li>
                <li className={style["item"]}>
                  <p className={style["left"]}>Distribution time:</p>
                  <p className={style["right"]}>
                    December 20th, 2022 <br/> 1:00 PM-UTC
                  </p>
                </li>
                <li className={style["item"]}>
                  <p className={style["left"]}>Initial market cap:</p>
                  <p className={style["right"]}>$500,000</p>
                </li>
                <li className={style["item"]}>
                  <p className={style["left"]}>Initial token circulation:</p>
                  <p className={style["right"]}>5,500,000</p>
                </li>
              </ul>
            </div>
          </div>
          <div id={style["block-2"]} className="col-12 col-md-7">
            <div className={style["banner"]}>
              <header className={style["header"]}>
                <div className={style["logo"]}>
                  <img src="/logo512.png" alt="" />
                </div>
              </header>
              <div className={style["carousel"]}>
                <Slider {...settings}>
                  <div>
                    <img
                      className={style["img"]}
                      src="/images/demo-project-banners/sbanner-1.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className={style["img"]}
                      src="/images/demo-project-banners/sbanner-2.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className={style["img"]}
                      src="/images/demo-project-banners/sbanner-3.png"
                      alt=""
                    />
                  </div>
                </Slider>
              </div>
            </div>

            <div className={style["description"]}>
              <h1 className="h3 text-green-1">Description</h1>
              <p>AptosPad is the launchpad platform on Aptos that accelerates future ideals by connecting the community, investors, and builders.</p>
              <br/>
              <h1 className="h3 text-green-1">Project Information</h1>
              <p>AptosPad is the launchpad platform on Aptos that accelerates future ideals by connecting the community, investors, and builders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
