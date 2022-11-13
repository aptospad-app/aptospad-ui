import {AptosPayload, TransactionProvider} from "@/Services/Wallet/TransactionProvider";
import {WalletNotFound} from "@/Services/Wallet/errors";

export class PontemTransactionProvider extends TransactionProvider {
  async sendTransactionOnAptos(options: any, payload: AptosPayload): Promise<any> {
    try {
      if (!("pontem" in window)) {
        throw new WalletNotFound();
      }

      const pontem = (window as any).pontem;
      const sender = this.aptosWalletAdapter.account?.address;
      console.log("Pontem use sender: " + sender);

      return await pontem.signAndSubmit(payload, options);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      console.log("Pontem submit transaction: " + payload + ", with options: " + options);
    }
  }
}
