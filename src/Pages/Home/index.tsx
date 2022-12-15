import React, {useEffect} from "react";
import style from "./index.module.scss";
import {useTranslation} from "react-i18next";
import ReactTooltip from "react-tooltip";
import Card from "./Components/Card";
import {ITF_WhyChooseThisToken} from "@/TS";
import Newsletter from "@/Components/Newsletter";
import {Link} from "react-router-dom";

export default function HomeScreen() {
  const {t} = useTranslation();
  const whyChooseThisToken: ITF_WhyChooseThisToken[] = [
    {
      "icon": "/images/like-icon.png",
      "message": "AptosPad is the fair platform for any participants accessing the early token sale of projects"
    },
    {
      "icon": "/images/shield-icon.png",
      "message": "Your investing is alway safe. There will be refund mechanism for each projects if not meet certain conditions (phase 2)"
    },
    {
      "icon": "/images/withdraw-icon.png",
      "message": "Community has the power to vote up or down any projects to be listed or delisted"
    },
    {
      "icon": "/images/eye-icon.png",
      "message": "All investing amount of any projects are kept track transparently by smart contracts"
    }
  ];

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <React.Fragment>
      <div id={`${style["Home"]}`}>
        <div id={`${style["block-1"]}`}>
          <div id={`${style["block-1-bg"]}`}></div>
          <div className={`${style["container"]} container`}>
            <div className={`${style["row"]} row`}>
              <div id={`${style["slogan-place"]}`} className="col-12 col-md-6">
                <h1 className={`${style["title"]}`}>AptosPad</h1>
                <p className={`${style["description"]}`}>
                  The DAO platform on Aptos to accelerate <br/> the future ideals
                </p>
                <div className="d-flex">
                  <Link to="/ido-projects" className="cbtn cbtn-lg cbtn-outline-gradient-blue me-2">Upcoming project</Link>
                  <a
                    href="https://forms.gle/1XXuWt819wmcuiv69"
                    className="cbtn cbtn-lg cbtn-outline-gradient-blue"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Launch your App
                  </a>
                </div>
              </div>
              <div id={`${style["description-photo"]}`} className="col-12 col-md-6 d-none d-md-flex h-100">
                <img className="hi" src="/images/logo-icon.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div id={`${style["block-2"]}`}>
          <h2 className="text-center pb-5">The trusted community - driven platform</h2>
          <div className={`${style["container"]} container`}>
            <div className={`${style["row"]} row`}>
              {
                whyChooseThisToken.map((item, index) => {
                  return (
                    <div key={index} className={`${style["item"]} col-12 col-md-6`} >
                      <Card data={item} />
                    </div>
                  );
                })
              }
            </div>

            <div className="d-flex justify-content-center pt-4">
              <Newsletter />
            </div>
          </div>
        </div>

        <div id={`${style["block-3"]}`} className="py-5">
          <h2 className="text-center mb-5">Want to launch your project on AptosPad?</h2>
          <div className="d-flex justify-content-center">
            <a
              className={`${style["btn-launch"]} cbtn cbtn-lg cbtn-outline-gradient-blue`}
              href="https://forms.gle/1XXuWt819wmcuiv69"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-rocket me-2 h4 mb-0" aria-hidden="true"></i>
              Apply to Launch
            </a>
          </div>
        </div>

        <div id={`${style["block-4"]}`}>
          <div className={`${style["banner"]} d-flex justify-content-center`}>
            <img src="/images/shake-hands-icon.png" alt="" />
          </div>
          <h2 className={`${style["title"]} text-center fw-bold pt-3`}>
            The great place when investors <br/> and projects meet together
          </h2>
          <div className={`${style["cosmos"]} container-fluid`}>
            <div id={`${style["cosmos-bg"]}`}></div>
            <div className={`${style["main-planet"]} ${style["main-planet-1"]} cbtn cbtn-outline-gradient-blue`}>
              <p className="mb-0">
                <span className={`${style["highlight"]}`}>Investors</span> are also the project supporters. The OGs, APD token holders and community supporters are always access to the project sales earlier and better price
              </p>
              <div
                className={`${style["sub-planet"]} ${style["sub-planet-white"]}`}
                style={{
                  "width": "40px",
                  "height": "40px",
                  "left": "-80px",
                  "top": "40px"
                }}
              ></div>
              <div
                className={`${style["sub-planet"]} ${style["sub-planet-green"]}`}
                style={{
                  "width": "20px",
                  "height": "20px",
                  "left": "-40px",
                  "bottom": "40px"
                }}
              ></div>
              <div
                className={`${style["sub-planet"]} ${style["sub-planet-white"]}`}
                style={{
                  "width": "60px",
                  "height": "60px",
                  "right": "30px",
                  "bottom": "-25px"
                }}
              ></div>
              <div
                className={`${style["sub-planet"]} ${style["sub-planet-green"]}`}
                style={{
                  "width": "45px",
                  "height": "45px",
                  "right": "-80px",
                  "top": "60px"
                }}
              ></div>
            </div>
            <div className={`${style["main-planet"]} ${style["main-planet-2"]} cbtn cbtn-outline-gradient-blue`}>
              <p className="mb-0">
                <span className={`${style["highlight"]}`}>Project owners/builders</span> commit to fulfill the projects and bring benefits to the early supports.
              </p>
              <div
                className={`${style["sub-planet"]} ${style["sub-planet-white"]}`}
                style={{
                  "width": "20px",
                  "height": "20px",
                  "left": "-40px",
                  "top": "60px"
                }}
              ></div>
              <div
                className={`${style["sub-planet"]} ${style["sub-planet-white"]}`}
                style={{
                  "width": "100px",
                  "height": "100px",
                  "right": "-27px",
                  "top": "-100px"
                }}
              ></div>
              <div
                className={`${style["sub-planet"]} ${style["sub-planet-green"]}`}
                style={{
                  "width": "21px",
                  "height": "21px",
                  "right": "-27px",
                  "top": "50px"
                }}
              ></div>
              <div
                className={`${style["sub-planet"]} ${style["sub-planet-green"]}`}
                style={{
                  "width": "45px",
                  "height": "45px",
                  "right": "-96px",
                  "bottom": "50px"
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
