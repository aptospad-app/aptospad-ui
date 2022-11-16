import {AptosPayload, TransactionProvider, TxParam} from "@/Services/Wallet/TransactionProvider";
import {WalletNotFound} from "@/Services/Wallet/errors";
import {WalletContextState} from "@manahippo/aptos-wallet-adapter";

export class MartianTransactionProvider extends TransactionProvider {

  async sendTransactionOnAptos(txParam: TxParam, payload: AptosPayload): Promise<any> {
    try {
      if (!("martian" in window)) {
        throw new WalletNotFound();
      }

      const martian = (window as any).martian;
      const sender = txParam.sender;
      console.log("Martian use sender: " + sender);

      return await martian.generateSignAndSubmitTransaction(sender, payload, txParam.options);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      console.log("Submit transaction: " + JSON.stringify(payload) + ", with options: " + txParam.options);
    }
  }
}
