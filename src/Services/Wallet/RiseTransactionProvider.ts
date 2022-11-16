import {AptosPayload, TransactionProvider, TxParam} from "@/Services/Wallet/TransactionProvider";
import {WalletNotFound} from "@/Services/Wallet/errors";

export class RiseTransactionProvider extends TransactionProvider {
  async sendTransactionOnAptos(txParam: TxParam, payload: AptosPayload): Promise<any> {
    try {
      if (!("rise" in window)) {
        throw new WalletNotFound();
      }
      const rise = (window as any).rise;

      return await rise.signAndSubmitTransaction(txParam.sender, payload, txParam.options);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      console.log("Submit transaction: " + JSON.stringify(payload) + ", with options: " + txParam.options);
    }
  }
}
