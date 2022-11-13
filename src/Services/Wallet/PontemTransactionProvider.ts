import {AptosPayload, TransactionProvider, TxParam} from "@/Services/Wallet/TransactionProvider";
import {WalletNotFound} from "@/Services/Wallet/errors";

export class PontemTransactionProvider extends TransactionProvider {
  async sendTransactionOnAptos(txParam: TxParam, payload: AptosPayload): Promise<any> {
    try {
      if (!("pontem" in window)) {
        throw new WalletNotFound();
      }

      const pontem = (window as any).pontem;
      const sender = txParam.sender;
      console.log("Pontem use sender: " + sender);

      return await pontem.signAndSubmit(payload, txParam.options);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      console.log("Pontem submit transaction: " + payload + ", with options: " + txParam.options);
    }
  }
}
