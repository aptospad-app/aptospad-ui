import {AptosPayload, TransactionProvider, TxParam} from "@/Services/Wallet/TransactionProvider";
import {WalletNotFound} from "@/Services/Wallet/errors";

export class SpikaTransactionProvider extends TransactionProvider {
  async sendTransactionOnAptos(txParam: TxParam, payload: AptosPayload): Promise<any> {
    try {
      if (!("spika" in window)) {
        throw new WalletNotFound();
      }
      const spika = (window as any).spika;

      return await spika.signAndSubmitTransaction(payload);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      console.log("Spika submit transaction: " + payload + ", with options: " + txParam.options);
    }
  }
}
