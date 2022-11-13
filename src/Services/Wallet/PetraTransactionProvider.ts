import {AptosPayload, TransactionProvider} from "@/Services/Wallet/TransactionProvider";
import {WalletNotFound} from "@/Services/Wallet/errors";

export class PetraTransactionProvider extends TransactionProvider {
  async sendTransactionOnAptos(options: any, payload: AptosPayload): Promise<any> {
    try {
      if (!("aptos" in window)) {
        throw new WalletNotFound();
      }
      const petra = (window as any).aptos;

      return await petra.signAndSubmitTransaction(payload);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      console.log("Petra submit transaction: " + payload + ", with options: " + options);
    }
  }
}
