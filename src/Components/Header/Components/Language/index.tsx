/**
 * Allow websites to request users' Binance Smart Chain addresses, read data
 * from the blockchain the user is connected to, and prompt the users to sign messages and
 * transactions
 *
 * References:
 * https://docs.binance.org/smart-chain/wallet/wallet_api.html
 *
 */

import React from "react";
import "./index.scss";
import {useAppDispatch, useAppSelector, LanguageActions} from "@/MyRedux";
import {useTranslation} from "react-i18next";
import {LanguageConstant} from "@/Constants";

export default function Language() {
  const {i18n} = useTranslation();
  const {language} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const onLanguageSelected = (languageSymbol: string) => {
    /**
     * Only change the language if the current language is different from the one you
     * are trying to set .
     */
    if (i18n.language !== languageSymbol) {
      i18n.changeLanguage(languageSymbol);
      dispatch(LanguageActions.setLanguage(languageSymbol));
    }
  };

  return (
    <div id="language" className="d-flex align-items-center">
      <i className="language-icon fa fa-language" aria-hidden="true"></i>
      <span className="language-text ms-2 text-uppercase">{language}</span>

      <div className="bound">
        <div className="actions">
          {
            LanguageConstant.LANGUAGE_LIST.map((language, index) => {
              return <div className="action" key={index} onClick={() => onLanguageSelected(language.symbol)}>{language.name}</div>;
            })
          }
        </div>
      </div>
    </div>
  );
}
