import {useWallet, WalletContextState} from "@manahippo/aptos-wallet-adapter";
import {AptosPayload, TransactionProvider, TxParam} from "./Wallet/TransactionProvider";
import {MartianTransactionProvider} from "./Wallet/MartianTransactionProvider";
import {WalletNotFound} from "@/Services/Wallet/errors";
import {FewchaTransactionProvider} from "@/Services/Wallet/FewchaTransactionProvider";
import {FletchTransactionProvider} from "@/Services/Wallet/FletchTransactionProvider";
import {PetraTransactionProvider} from "@/Services/Wallet/PetraTransactionProvider";
import {PontemTransactionProvider} from "@/Services/Wallet/PontemTransactionProvider";
import {RiseTransactionProvider} from "@/Services/Wallet/RiseTransactionProvider";
import {SpikaTransactionProvider} from "@/Services/Wallet/SpikaTransactionProvider";

export class AptospadTransactionService {
  private aptosWalletAdapter: WalletContextState;

  constructor(aptosWalletAdapter: WalletContextState) {
    this.aptosWalletAdapter = aptosWalletAdapter;
  }

  selectTxProvider(walletName: string): TransactionProvider {
    switch (walletName) {
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

  async register(): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);

    const address = this.aptosWalletAdapter.account?.address as string;
    const payload: AptosPayload = {
      "arguments": [],
      "function": "aptospad::aptospad_swap::withdrawAptos",
      "type_arguments": ["aptospad::aptospad_coin::AptosPadCoin"],
      "type": ""
    };
    const param: TxParam = {
      "sender": address,
      "options": undefined
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }

  async withdrawAptos(debit: string, amount: BigInt): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);

    const address = this.aptosWalletAdapter.account?.address as string;
    const payload: AptosPayload = {
      "arguments": [debit, amount.toString()],
      "function": "aptospad::aptospad_swap::withdrawAptos",
      "type_arguments": ["aptospad::aptospad_coin::AptosPadCoin"],
      "type": ""
    };
    const param: TxParam = {
      "sender": address,
      "options": undefined
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }
}
