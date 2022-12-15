import React from "react";
import style from "./index.module.scss";
import {LoadingSpinnerActions, PopupsActions, useAppDispatch, useAppSelector} from "@/MyRedux";
import {Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import {useWallet} from "@manahippo/aptos-wallet-adapter";

export default function ChooseWalletPopup() {
  const dispatch = useAppDispatch();
  const {wallet, popups} = useAppSelector((state) => state);
  const walletContext = useWallet();

  const onSelecteWallet = async (index: number) => {
    try {
      const selectedWallet = walletContext.wallets[index];
      if (selectedWallet.readyState === "NotDetected") {
        throw new Error("Wallet provider not installed, please install first and then reload the page.");
      }
      dispatch(PopupsActions.togglePopup({"popupName": "chooseWallet", "display": false}));
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(true));
      await walletContext.connect(selectedWallet.adapter.name);
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(false));

      walletContext.wallet = selectedWallet;
      walletContext.account = selectedWallet.adapter.publicAccount;
    } catch (error: any) {
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(false));
      dispatch(PopupsActions.togglePopup({"popupName": "chooseWallet", "display": false}));
      toast.error(error.message);
    }
  };

  return (
    <Modal
      show={true}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={true}
      onHide={() => dispatch(PopupsActions.togglePopup({"popupName": "chooseWallet", "display": false}))}
      contentClassName={`${style["choose-wallet-popup"]}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>Connect a Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          walletContext.wallets.map((item, index) => {
            if (
              item.adapter.name === "Petra" ||
              item.adapter.name === "Martian" ||
              item.adapter.name === "Pontem" ||
              item.adapter.name === "Fewcha" ||
              item.adapter.name === "Rise Wallet" ||
              item.adapter.name === "Spika" ||
              item.adapter.name === "SafePal" ||
              item.adapter.name === "Spacecy"
            ) {
              return (
                <div className="wallets-list" key={index} onClick={() => onSelecteWallet(index)}>
                  <img src={item.adapter.icon} className="me-4" alt="" />
                  {item.adapter.name}
                </div>
              );
            } else {
              return null;
            }
          })
        }
      </Modal.Body>
    </Modal>
  );
}
