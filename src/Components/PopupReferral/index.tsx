import React, {useState, useEffect} from "react";
import style from "./index.module.scss";
import {useAppDispatch, useAppSelector, LoadingSpinnerActions, PopupsActions} from "@/MyRedux";
import {Modal} from "react-bootstrap";
import {CommonUtility} from "@/Utilities";
import {toast} from "react-toastify";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {WalletService} from "@/Services";

export default function PopupReferral() {
  const dispatch = useAppDispatch();
  const aptosWalletAdapter = useWallet();
  const {loadingSpinner} = useAppSelector((state) => state);
  let copiedAddress = false;
  const referralLink = `${process.env.URL}/buy-test?ref=${aptosWalletAdapter.account?.address}`;
  const [referralInfo, setReferralInfo] = useState({
    "referrer": null,
    "totalMembers": 0
  });

  const copyTextToClipboard = async (value: string) => {
    if (!copiedAddress) {
      navigator.clipboard.writeText(value.trim());
      copiedAddress = true;
      toast.success("Copied to Clipboard.", {"autoClose": 2000});
      setTimeout(() => {
        copiedAddress = false;
      }, 2000);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch(LoadingSpinnerActions.toggleLoadingSpinner(true));
        const response = await WalletService.getReferralInfo(aptosWalletAdapter.account?.address as any);
        const responseResult = response.data.data;
        if (responseResult) {
          const newData = {
            ...responseResult.referrer && {"referrer": responseResult.referrer},
            ...{"totalMembers": responseResult.total_members}
          };
          setReferralInfo({...referralInfo, ...newData});
        }
        dispatch(LoadingSpinnerActions.toggleLoadingSpinner(false));
      } catch (error) {
        dispatch(LoadingSpinnerActions.toggleLoadingSpinner(false));
      }
    })();
  }, []);

  return (
    <Modal
      show={true}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={true}
      onHide={() => dispatch(PopupsActions.togglePopup({"popupName": "referral", "display": false}))}
      contentClassName={`${style["popup-referral"]}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Referral
          <div className="mb-3 text-info h6">
            Share your referral link with friends to earn rewards.
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div className="mb-3">
          <p className="mb-0">Referrer:
            <strong className="ms-4">{referralInfo.referrer ? CommonUtility.stringEllipsisMiddle(referralInfo.referrer as any, 6) : "No one"}</strong>
            {
              referralInfo.referrer && (
                <i
                  className="fa fa-clipboard ms-3"
                  role="button"
                  aria-hidden="true"
                  onClick={() => copyTextToClipboard(referralInfo.referrer!)}
                ></i>
              )
            }
          </p>
        </div>

        <div className="mb-3">
          <p className="mb-0">Total Referrals:
            <strong className="ms-3">{referralInfo.totalMembers}</strong>
          </p>
        </div>

        <div className="mb-3">
          <label className="form-label">Your Referral Link:</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder=""
              defaultValue={referralLink}
              disabled
            />
            <span
              id="copy-referral"
              className="input-group-text"
              role="button"
              onClick={() => copyTextToClipboard(referralLink)}
            >
              <i className="fa fa-clipboard" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
