import {WalletContextState} from "@manahippo/aptos-wallet-adapter";

export abstract class TransactionProvider {
  protected aptosWalletAdapter: WalletContextState;

  protected constructor(aptosWalletAdapter: WalletContextState) {
    this.aptosWalletAdapter = aptosWalletAdapter;
  }

  abstract sendTransactionOnAptos(options: any, payload: AptosPayload): Promise<any>;
}

export interface AptosPayload {
  "function": string,
  "type_arguments": Array<string>,
  "arguments": Array<any>,
  "type": string
}
