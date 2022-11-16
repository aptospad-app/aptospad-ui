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
import {AptosClient} from "aptos";

const ownerAddress = process.env.APTOSPAD_OWNER_ADDRESS;
const aptosNodeUrl = process.env.APTOS_FULL_NODE as string | "";

export class AptospadTransactionService {
  private aptosWalletAdapter: WalletContextState;
  private aptosClient: AptosClient;

  constructor(aptosWalletAdapter: WalletContextState) {
    this.aptosWalletAdapter = aptosWalletAdapter;
    this.aptosClient = new AptosClient(aptosNodeUrl);
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
      case "rise wallet":
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
    const payload: AptosPayload = {
      "arguments": [account, cap.toString()],
      "function": `${ownerAddress}::scripts::addWhiteList`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };
    const param: TxParam = {
      "sender": this.aptosWalletAdapter.account?.address as string
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }

  async withdrawAptos(debitAddress: string, amount: BigInt): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);
    const payload: AptosPayload = {
      "arguments": [debitAddress, amount.toString()],
      "function": `${ownerAddress}::scripts::withdrawAptos`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };
    const param: TxParam = {
      "sender": this.aptosWalletAdapter.account?.address as string
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }

  async withdrawAptosPad(debitAddress: string, amount: BigInt): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);
    const payload: AptosPayload = {
      "arguments": [debitAddress, amount.toString()],
      "function": `${ownerAddress}::scripts::withdrawAptosPad`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };
    const param: TxParam = {
      "sender": this.aptosWalletAdapter.account?.address as string
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }

  async launchPadSeason(): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);
    const payload: AptosPayload = {
      "arguments": [],
      "function": `${ownerAddress}::scripts::launchPadSeason`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };
    const param: TxParam = {
      "sender": this.aptosWalletAdapter.account?.address as string
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }

  async initializeAptosPad(aptosFund: BigInt): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);
    const payload: AptosPayload = {
      "arguments": [aptosFund.toString()],
      "function": `${ownerAddress}::scripts::initializeAptosPad`,
      "type_arguments": [`${ownerAddress}::aptospad_coin::AptosPadCoin`],
      "type": "entry_function_payload"
    };
    const param: TxParam = {
      "sender": this.aptosWalletAdapter.account?.address as string
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }

  async resetSeason(): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);
    const payload: AptosPayload = {
      "arguments": [],
      "function": `${ownerAddress}::scripts::resetSeason`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };
    const param: TxParam = {
      "sender": this.aptosWalletAdapter.account?.address as string
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }

  async bidAptosPad(amount: BigInt): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);
    const payload: AptosPayload = {
      "arguments": [amount.toString()],
      "function": `${ownerAddress}::scripts::bidAptosPad`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };
    const param: TxParam = {
      "sender": this.aptosWalletAdapter.account?.address as string
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }

  async setApttSwapConfig(softCap: BigInt, hardCap: BigInt, enableRefund: boolean, aptToApttRate: BigInt): Promise<any> {
    const walletName = this.aptosWalletAdapter.wallet?.adapter.name as string;
    const txProvider = this.selectTxProvider(walletName);
    const payload: AptosPayload = {
      "arguments": [softCap.toString(), hardCap.toString(), enableRefund, aptToApttRate.toString()],
      "function": `${ownerAddress}::scripts::setApttSwapConfig`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };
    const param: TxParam = {
      "sender": this.aptosWalletAdapter.account?.address as string
    };

    return await txProvider.sendTransactionOnAptos(param, payload);
  }
}
