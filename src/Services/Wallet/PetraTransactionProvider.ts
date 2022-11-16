import {AptosPayload, TransactionProvider, TxParam} from "@/Services/Wallet/TransactionProvider";
import {WalletNotFound} from "@/Services/Wallet/errors";

export class PetraTransactionProvider extends TransactionProvider {
  async sendTransactionOnAptos(txParam: TxParam, payload: AptosPayload): Promise<any> {
    try {
      if (!("aptos" in window)) {
        throw new WalletNotFound();
      }
      const petra = (window as any).aptos;

      return await petra.signAndSubmitTransaction(payload, txParam.options);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      console.log("Submit transaction: " + JSON.stringify(payload) + ", with options: " + txParam.options);
    }
  }
}
