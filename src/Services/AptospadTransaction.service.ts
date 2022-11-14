import {WalletContextState} from "@manahippo/aptos-wallet-adapter";
import {AptosPayload, TransactionProvider, TxParam} from "./Wallet/TransactionProvider";
import {MartianTransactionProvider} from "./Wallet/MartianTransactionProvider";
import {WalletNameEmpty, WalletNotFound} from "@/Services/Wallet/errors";
import {FewchaTransactionProvider} from "@/Services/Wallet/FewchaTransactionProvider";
import {FletchTransactionProvider} from "@/Services/Wallet/FletchTransactionProvider";
import {PetraTransactionProvider} from "@/Services/Wallet/PetraTransactionProvider";
import {PontemTransactionProvider} from "@/Services/Wallet/PontemTransactionProvider";
import {RiseTransactionProvider} from "@/Services/Wallet/RiseTransactionProvider";
import {SpikaTransactionProvider} from "@/Services/Wallet/SpikaTransactionProvider";

const ownerAddress = process.env.APTOSPAD_OWNER_ADDRESS;

export class AptospadTransactionService {
  private aptosWalletAdapter: WalletContextState;

  constructor(aptosWalletAdapter: WalletContextState) {
    this.aptosWalletAdapter = aptosWalletAdapter;
  }

  selectTxProvider(walletName: string): TransactionProvider {
    if (!walletName) {
      throw new WalletNameEmpty();
    }
    switch (walletName.toLowerCase()) {
      case "martian":
        return new MartianTransactionProvider();
      case "fewcha":
        return new FewchaTransactionProvider();
      case "fletch":
        return new FletchTransactionProvider();
      case "petra":
        return new PetraTransactionProvider();
      case "pontem":
        return new PontemTransactionProvider();
      case "rise":
        return new RiseTransactionProvider();
      case "spika":
        return new SpikaTransactionProvider();
      default:
        throw new WalletNotFound();
    }
  }

  async addWhiteList(account: string, cap: BigInt): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);

    const sender = this.aptosWalletAdapter.account?.address as string;
    const funcContract = `${ownerAddress}::scripts::addWhiteList`;

    const payload: AptosPayload = {
      "arguments": [account, cap.toString()],
      "function": funcContract,
      "type_arguments": [`${ownerAddress}::aptospad_coin::AptosPadCoin`],
      "type": ""
    };
    const param: TxParam = {
      "sender": sender,
      "options": undefined
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }

  async withdrawAptos(debitAddress: string, amount: BigInt): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);

    const sender = this.aptosWalletAdapter.account?.address as string;
    const funcContract = `${ownerAddress}::scripts::withdrawAptos`;

    const payload: AptosPayload = {
      "arguments": [debitAddress, amount.toString()],
      "function": funcContract,
      "type_arguments": [`${ownerAddress}::aptospad_coin::AptosPadCoin`],
      "type": ""
    };
    const param: TxParam = {
      "sender": sender,
      "options": undefined
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }

  async withdrawAptosPad(debitAddress: string, amount: BigInt): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);

    const sender = this.aptosWalletAdapter.account?.address as string;
    const funcContract = `${ownerAddress}::scripts::withdrawAptosPad`;

    const payload: AptosPayload = {
      "arguments": [debitAddress, amount.toString()],
      "function": funcContract,
      "type_arguments": [`${ownerAddress}::aptospad_coin::AptosPadCoin`],
      "type": ""
    };
    const param: TxParam = {
      "sender": sender,
      "options": undefined
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }
}
