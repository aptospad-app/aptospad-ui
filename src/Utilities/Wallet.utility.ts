import {DialectAptosWalletAdapter} from "@dialectlabs/react-sdk-blockchain-aptos";
import {SignMessageResponse as AptosSignMessageResponse, WalletContextState} from "@manahippo/aptos-wallet-adapter";

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
