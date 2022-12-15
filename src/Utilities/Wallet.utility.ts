import {DialectAptosWalletAdapter} from "@dialectlabs/react-sdk-blockchain-aptos";
import {SignMessageResponse as AptosSignMessageResponse, WalletContextState} from "@manahippo/aptos-wallet-adapter";
import {WalletAdapterProps} from "@dialectlabs/blockchain-sdk-aptos";
import {AccountKeys} from "@dialectlabs/blockchain-sdk-aptos/src/wallet-adapter/dialect-aptos-wallet-adapter.interface";

export const aptosWalletToDialectWallet = (wallet: WalletContextState): DialectAptosWalletAdapter | null => {
  if (
    !wallet.connected ||
    wallet.connecting ||
    !wallet.account?.address ||
    !wallet.account.publicKey
  ) {
    return null;
  }

  return {
    "address": wallet.account?.address,
    "publicKey": wallet.account?.publicKey as string,
    "signMessagePayload": (payload: any) => {
      return wallet.signMessage(payload) as Promise<AptosSignMessageResponse>;
    }
  };
};

export const aptosWalletToWalletAdapterProps = (wallet: WalletContextState): WalletAdapterProps | null => {
  if (
    !wallet.connected ||
    wallet.connecting ||
    !wallet.account?.address ||
    !wallet.account.publicKey
  ) {
    return null;
  }

  return {
    "publicAccount": wallet.account as AccountKeys,
    "signMessage": (message: string) => {
      return wallet.signMessage(message) as Promise<string>;
    },
    "signMessagePayload": (payload: any) => {
      return wallet.signMessage(payload) as Promise<AptosSignMessageResponse>;
    }
  };
};
