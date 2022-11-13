import React from "react";
import style from "./index.module.scss";
import {useAppDispatch, useAppSelector, LoadingSpinnerActions, ChooseWalletPopupActions} from "@/MyRedux";
import {Modal} from "react-bootstrap";
import {CommonUtility} from "@/Utilities";
import {toast} from "react-toastify";
import {useWallet} from "@manahippo/aptos-wallet-adapter";

export default function ChooseWalletPopup() {
  const dispatch = useAppDispatch();
  const {wallet, chooseWalletPopup} = useAppSelector((state) => state);
  const aptosWalletAdapter = useWallet();

  const onSelecteWallet = async (index: number) => {
    try {
      const selectedWallet = aptosWalletAdapter.wallets[index];
      if (selectedWallet.readyState === "NotDetected") {
        throw new Error("Wallet provider not installed, please install first and then reload the page.");
      }
      dispatch(ChooseWalletPopupActions.toggleChooseWalletPopup(false));
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(true));
      await aptosWalletAdapter.connect(selectedWallet.adapter.name);
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(false));
    } catch (error: any) {
      dispatch(LoadingSpinnerActions.toggleLoadingSpinner(false));
      dispatch(ChooseWalletPopupActions.toggleChooseWalletPopup(false));
      toast.error(error.message);
    }
  };

  return (
    <Modal
      show={chooseWalletPopup}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={true}
      onHide={() => dispatch(ChooseWalletPopupActions.toggleChooseWalletPopup(false))}
      contentClassName={`${style["choose-wallet-popup"]}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>Connect a Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          aptosWalletAdapter.wallets.map((item, index) => {
            if (item.adapter.name === "Petra") {
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
