import {AptosPayload, TransactionProvider} from "./TransactionProvider";
import {WalletGenerateError, WalletNotFound, WalletSignError} from "@/Services/Wallet/errors";

export class FewchaTransactionProvider extends TransactionProvider {
  async sendTransactionOnAptos(options: any, payload: AptosPayload): Promise<any> {
    try {
      if (!("fewcha" in window)) {
        throw new WalletNotFound();
      }

      const fewcha = (window as any).fewcha;
      const sender = this.aptosWalletAdapter.account?.address;
      console.log("Fewcha use sender: " + sender);

      const rawTransaction = await fewcha.generateTransaction(payload, options);
      if (rawTransaction.status !== 200) {
        throw new WalletGenerateError();
      }
      const signedTx = await fewcha.signTransaction(rawTransaction.data);
      if (signedTx.status !== 200) {
        throw new WalletSignError();
      }

      return await fewcha.submitTransaction(signedTx.data);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      console.log("Fewcha submit transaction: " + payload + ", with options: " + options);
    }
  }
}
