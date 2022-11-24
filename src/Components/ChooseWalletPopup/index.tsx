import React from "react";
import style from "./index.module.scss";
import {useAppDispatch, useAppSelector, LoadingSpinnerActions, PopupsActions} from "@/MyRedux";
import {Modal} from "react-bootstrap";
import {CommonUtility} from "@/Utilities";
import {toast} from "react-toastify";
import {useWallet} from "@manahippo/aptos-wallet-adapter";

export default function ChooseWalletPopup() {
  const dispatch = useAppDispatch();
  const {wallet, popups} = useAppSelector((state) => state);
  const aptosWalletAdapter = useWallet();

  const onSelecteWallet = async (index: number) => {
    try {
      const selectedWallet = aptosWalletAdapter.wallets[index];
      if (selectedWallet.readyState === "NotDetected") {
        throw new Error("Wallet provider not installed, please install first and then reload the page.");
      }
      dispatch(PopupsActions.togglePopup({"popupName": "chooseWallet", "display": false}));
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(true));
      await aptosWalletAdapter.connect(selectedWallet.adapter.name);
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(false));
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
          aptosWalletAdapter.wallets.map((item, index) => {
            if (
              item.adapter.name === "Petra" ||
              item.adapter.name === "Martian" ||
              item.adapter.name === "Pontem" ||
              item.adapter.name === "Fewcha" ||
              item.adapter.name === "Rise Wallet" ||
              item.adapter.name === "Spika" ||
              item.adapter.name === "SafePal"
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
