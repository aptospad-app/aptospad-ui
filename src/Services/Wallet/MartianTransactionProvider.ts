import {AptosPayload, TransactionProvider} from "@/Services/Wallet/TransactionProvider";
import {WalletNotFound} from "@/Services/Wallet/errors";

export class MartianTransactionProvider extends TransactionProvider {

  async sendTransactionOnAptos(options: any, payload: AptosPayload): Promise<any> {
    try {
      if (!("martian" in window)) {
        throw new WalletNotFound();
      }

      const martian = (window as any).martian;
      const sender = this.aptosWalletAdapter.account?.address;
      console.log("Martian use sender: " + sender);

      return await martian.generateSignAndSubmitTransaction(sender, payload, options);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      console.log("Martian submit transaction: " + payload + ", with options: " + options);
    }
  }
}
