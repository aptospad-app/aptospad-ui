import React, {ReactNode, useEffect} from "react";
import ReactDOM, {Root} from "react-dom/client";
import styles from "./styles.module.scss";

interface ITF_AlertProps {
  message?: ReactNode;
  resolve: (value: boolean) => void;
  close: Function;
  btnOkText?: string;
}

function AlertComponent(props: ITF_AlertProps) {
  const {message, resolve, close, btnOkText} = props;

  const handlePressEnter = (event: any) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("btn-ok")!.click();
    }
  };

  const closeBtnClicked = () => {
    resolve(false);
    close();
  };

  const okBtnClicked = () => {
    resolve(true);
    close();
  };

  useEffect(() => {
    // Execute a function when the user releases a key on the keyboard
    window.addEventListener("keydown", handlePressEnter);

    return function cleanup() {
      window.removeEventListener("keydown", handlePressEnter);
    };
  }, []);

  return (
    <div id={styles["alert"]}>
      <div className="alert-bg">
        <div className="alert col-11 col-sm-5 col-md-3">
          <div className="alert-header">
            <span className="header-close" onClick={() => closeBtnClicked()}><i className="fa fa-times" aria-hidden="true"></i></span>
          </div>
          <div className="alert-body mb-3 text-center">
            {message}
          </div>
          <div className="alert-footer text-center">
            <button
              id="btn-ok"
              type="button"
              className="btn btn-success"
              onClick={() => okBtnClicked()}
            >
              {btnOkText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AlertComponent.defaultProps = {
  "message": "Message",
  "btnOkText": "Ok"
};

let alertContainer: Root | null = null;

const show = (message: ReactNode, btnOkText?: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!document.getElementById("dirtyWayToInjectAlert")) {
      document.body.style.overflow = "hidden";
      const el = document.createElement("div");
      el.setAttribute("id", "dirtyWayToInjectAlert");
      alertContainer = ReactDOM.createRoot(document.body.appendChild(el));
      alertContainer.render(
        <AlertComponent
          message={message}
          resolve={resolve}
          btnOkText={btnOkText}
          close={hide}
        />
      );
    }
  });
};

const hide = (): void => {
  const el = document.getElementById("dirtyWayToInjectAlert");
  if (el && alertContainer) {
    document.body.style.overflow = "auto";
    alertContainer.unmount();
    document.body.removeChild(el);
  }
};

export const Alert = show;
