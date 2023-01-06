import React, {useState, useEffect, useRef} from "react";
import style from "./index.module.scss";
import {useAppDispatch, useAppSelector, LoadingSpinnerActions, TransactionSettingsActions, PopupsActions} from "@/MyRedux";
import {Modal} from "react-bootstrap";
import {CommonUtility} from "@/Utilities";
import {toast} from "react-toastify";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {WalletService} from "@/Services";
import {ITF_TransactionSettings} from "@/TS";

export default function PopupReferral() {
  const dispatch = useAppDispatch();
  const walletAdapter = useWallet();
  const {loadingSpinner} = useAppSelector((state) => state);
  const transactionSettings = useAppSelector((state) => state.transactionSettings);
  const slippageDefault = useRef<string[]>(["0.5", "1", "2"]).current;
  const [form, setForm] = useState<ITF_TransactionSettings>({
    "slippage": (transactionSettings.slippage !== "0" && transactionSettings.slippage !== "0.5" && transactionSettings.slippage !== "1" && transactionSettings.slippage !== "2") ? transactionSettings.slippage : "",
    "deadline": transactionSettings.deadline,
    "maxGasFee": transactionSettings.maxGasFee
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {name, value} = e.currentTarget;
    if (!CommonUtility.allowSixDigitsAfterDecimalPoint(value)) {
      return;
    }
    setForm({...form, [name]: value});
    if (value) {
      dispatch(TransactionSettingsActions.set({[name]: value}));
    } else {
      dispatch(TransactionSettingsActions.set({[name]: "0"}));
    }
  };

  const onReset = () => {
    const defaultValue = {
      "slippage": "0.5",
      "deadline": "60",
      "maxGasFee": "20000"
    };
    setForm({
      "slippage": "",
      "deadline": defaultValue.deadline,
      "maxGasFee": defaultValue.maxGasFee
    });
    dispatch(TransactionSettingsActions.set(defaultValue));
  };

  return (
    <Modal
      show={true}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={true}
      onHide={() => dispatch(PopupsActions.togglePopup({"popupName": "transactionSettings", "display": false}))}
      contentClassName={`${style["popup-transactionSettings"]}`}
    >
      <Modal.Header className={style["model-header"]}>
        <Modal.Title className={style["model-title"]}>Transaction Settings</Modal.Title>
      </Modal.Header>

      <Modal.Body className={style["model-body"]}>
        <div className="mb-4">
          <p className="text-green-1">Slippage Tolerance</p>
          <div className={style["slippage"]}>
            {
              slippageDefault.map((item, key) => {
                return (
                  <button
                    key={key}
                    className={`${style["btn-type-1"]} ${transactionSettings.slippage === item ? style["active"] : ""}`}
                    type="button"
                    onClick={() => {
                      dispatch(TransactionSettingsActions.set({"slippage": item}));
                      setForm({...form, "slippage": ""});
                    }}
                  >
                    {item}%
                  </button>
                );
              })
            }

            <div className={`${style["input-custom"]} input-group`}>
              <input
                type="text"
                className="form-control"
                placeholder="Custom"
                name="slippage"
                value={form.slippage}
                onInput={handleInputChange}
              />
              <span className={`${style["extend"]} input-group-text`}>%</span>
            </div>
          </div>
        </div>

        <div className={`${style["line"]} mb-4`}>
          <span className={`${style["title"]} text-green-1`}>Transaction Deadline</span>
          <div className={`${style["input-custom"]} input-group`}>
            <input
              type="text"
              className="form-control"
              name="deadline"
              value={form.deadline}
              onInput={handleInputChange}
            />
            <span className={`${style["extend"]} input-group-text`}>Seconds</span>
          </div>
        </div>

        <div className={`${style["line"]}`}>
          <span className={`${style["title"]} text-green-1`}>Max Gas Fee</span>
          <div className={`${style["input-custom"]} input-group`}>
            <input
              type="text"
              className="form-control"
              name="maxGasFee"
              value={form.maxGasFee}
              onInput={handleInputChange}
            />
            <span className={`${style["extend"]} input-group-text`}>Gas Units</span>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className={style["model-footer"]}>
        <button
          className="cbtn cbtn-outline-gradient-blue text-green-1"
          type="button"
          onClick={() => onReset()}
        >
          Reset
        </button>
        <button
          className="cbtn cbtn-outline-gradient-blue text-green-1"
          type="button"
          onClick={() => dispatch(PopupsActions.togglePopup({"popupName": "transactionSettings", "display": false}))}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
