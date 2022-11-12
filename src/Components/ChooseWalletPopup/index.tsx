import React from "react";
import style from "./index.module.scss";
import {useAppDispatch, useAppSelector, WalletActions, ChooseWalletPopupActions} from "@/MyRedux";
import {Modal} from "react-bootstrap";
import {CommonUtility} from "@/Utilities";
import {toast} from "react-toastify";
import {useWallet} from "@manahippo/aptos-wallet-adapter";

export default function ChooseWalletPopup() {
  const dispatch = useAppDispatch();
  const {wallet, chooseWalletPopup} = useAppSelector((state) => state);
  const aptosWalletAdapter = useWallet();

  const closeChooseWalletPopup = () => {
    dispatch(ChooseWalletPopupActions.toggleChooseWalletPopup(false));
  };

  const onSelecteWallet = async (index: number) => {
    try {
      const selectedWallet = aptosWalletAdapter.wallets[index];
      if (selectedWallet.readyState === "NotDetected") {
        throw new Error("Wallet provider not installed, please install first and then reload the page.");
      }
      await aptosWalletAdapter.connect(selectedWallet.adapter.name);
    } catch (error: any) {
      closeChooseWalletPopup();
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
      onHide={closeChooseWalletPopup}
      contentClassName={`${style["choose-wallet-popup"]}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>Connect a Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          aptosWalletAdapter.wallets.map((item, index) => {
            return (
              <div className="wallets-list" key={index} onClick={() => onSelecteWallet(index)}>
                <img src={item.adapter.icon} className="me-4" alt="" />
                {item.adapter.name}
              </div>
            );
          })
        }
      </Modal.Body>
    </Modal>
  );
}
