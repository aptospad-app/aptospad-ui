import {AptosPayload, TransactionProvider, TxParam} from "@/Services/Wallet/TransactionProvider";
import {WalletNotFound} from "@/Services/Wallet/errors";

export class FletchTransactionProvider extends TransactionProvider {
  async sendTransactionOnAptos(txParam: TxParam, payload: AptosPayload): Promise<any> {
    try {
      if (!("fletch" in window)) {
        throw new WalletNotFound();
      }
      const fletch = (window as any).fletch;

      return await fletch.signAndSubmitTransaction(payload);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      console.log("Fletch submit transaction: " + payload + ", with options: " + txParam.options);
    }
  }
}
