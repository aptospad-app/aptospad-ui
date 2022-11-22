import {WalletAdapter, WalletContextState} from "@manahippo/aptos-wallet-adapter";
import {AptosClient, MaybeHexString, MoveResource, Types} from "aptos";
import {WalletNameEmpty, WalletNotFound} from "@/Services/Wallet/errors";
import {SignMessagePayload, SignMessageResponse} from "@manahippo/aptos-wallet-adapter/src/WalletAdapters/BaseAdapter";

const aptosNodeUrl = process.env.APTOS_FULL_NODE_URL as string | "";

export class AptosWalletAdapter {
  private walletContextState: WalletContextState;
  private aptosClient: AptosClient;

  constructor(walletContextState: WalletContextState) {
    this.walletContextState = walletContextState;
    this.aptosClient = new AptosClient(aptosNodeUrl);
    console.log(this.aptosClient);
    console.log(walletContextState);
  }

  selectAdapter(walletName: string): WalletAdapter | undefined {
    if (!walletName) {
      throw new WalletNameEmpty();
    }
    switch (walletName.toLowerCase()) {
      case "martian":
      case "fewcha":
      case "fletch":
      case "petra":
      case "pontem":
      case "rise wallet":
      case "spika":
        return this.walletContextState.wallet?.adapter;
      default:
        throw new WalletNotFound();
    }
  }

  async signAndSubmitTransaction(payload: AptosPayload): Promise<{ hash: Types.HexEncodedBytes } | undefined> {
    const walletName = this.walletContextState.wallet?.adapter.name as string;
    const walletAdapter = this.selectAdapter(walletName);
    const param: TxParam = {
      "sender": this.walletContextState.account?.address as string
    };

    return walletAdapter?.signAndSubmitTransaction(payload, param);
  }

  async signMessage(signPayload: SignMessagePayload): Promise<string | SignMessageResponse | undefined> {
    const walletName = this.walletContextState.wallet?.adapter.name as string;
    const walletAdapter = this.selectAdapter(walletName);

    return walletAdapter?.signMessage(signPayload);
  }

  async getResource(accountAddress: MaybeHexString, resourceType: string): Promise<MoveResource> {
    return this.aptosClient.getAccountResource(accountAddress, resourceType);
  }
}

export interface AptosPayload {
  function: string,
  type_arguments: string[],
  arguments: any[],
  type: string
}

export interface TxParam {
  sender: string,
  options?: any
}
