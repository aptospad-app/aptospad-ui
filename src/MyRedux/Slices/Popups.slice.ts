import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ITF_Popup {
  display: boolean;
  data?: any;
}
interface ITF_Popups {
  chooseWallet: ITF_Popup;
  referral: ITF_Popup;
  transactionSettings: ITF_Popup;
}

interface ITF_Payload {
  popupName: keyof ITF_Popups;
  display: ITF_Popup["display"];
  data?: ITF_Popup["data"];
}

const initialState: ITF_Popups = {
  "chooseWallet": {
    "display": false
  },
  "referral": {
    "display": false
  },
  "transactionSettings": {
    "display": false
  }
};
const slice = createSlice({
  "name": "popups",
  initialState,
  "reducers": {
    "togglePopup": (state, action: PayloadAction<ITF_Payload>) => {
      const data = {
        ...{"display": action.payload.display},
        ...(action.payload.data !== undefined) && {"data": action.payload.data}
      };
      state = {
        ...initialState,
        ...{[action.payload.popupName]: data}
      };

      return state;
    }
  }
});

export const PopupsActions = slice.actions;

export const PopupsReducer = slice.reducer;
