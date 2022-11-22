import {AptosPayload, AptosWalletAdapter} from "@/Services/Wallet/AptosWalletAdapter";
import {WalletContextState} from "@manahippo/aptos-wallet-adapter";
import {MaybeHexString, MoveResource} from "aptos";

const ownerAddress = process.env.APTOSPAD_OWNER_ADDRESS;

export class AptospadBusinessService {
  private walletAdapter: AptosWalletAdapter;

  constructor(walletContext: WalletContextState) {
    this.walletAdapter = new AptosWalletAdapter(walletContext);
  }

  async addWhiteList(account: string, cap: BigInt): Promise<any> {
    const payload: AptosPayload = {
      "arguments": [account, cap.toString()],
      "function": `${ownerAddress}::scripts::addWhiteList`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };

    return this.walletAdapter.signAndSubmitTransaction(payload);
  }

  async withdrawAptos(debitAddress: string, amount: BigInt): Promise<any> {
    const payload: AptosPayload = {
      "arguments": [debitAddress, amount.toString()],
      "function": `${ownerAddress}::scripts::withdrawAptos`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };

    return this.walletAdapter.signAndSubmitTransaction(payload);
  }

  async withdrawAptosPad(debitAddress: string, amount: BigInt): Promise<any> {
    const payload: AptosPayload = {
      "arguments": [debitAddress, amount.toString()],
      "function": `${ownerAddress}::scripts::withdrawAptosPad`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };

    return this.walletAdapter.signAndSubmitTransaction(payload);
  }

  async launchPadSeason(): Promise<any> {
    const payload: AptosPayload = {
      "arguments": [],
      "function": `${ownerAddress}::scripts::launchPadSeason`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };

    return this.walletAdapter.signAndSubmitTransaction(payload);
  }

  async initializeAptosPad(aptosFund: BigInt): Promise<any> {
    const payload: AptosPayload = {
      "arguments": [aptosFund.toString()],
      "function": `${ownerAddress}::scripts::initializeAptosPad`,
      "type_arguments": [`${ownerAddress}::aptospad_coin::AptosPadCoin`],
      "type": "entry_function_payload"
    };

    return this.walletAdapter.signAndSubmitTransaction(payload);
  }

  async resetSeason(): Promise<any> {
    const payload: AptosPayload = {
      "arguments": [],
      "function": `${ownerAddress}::scripts::resetSeason`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };

    return this.walletAdapter.signAndSubmitTransaction(payload);
  }

  async bidAptosPad(amount: BigInt): Promise<any> {
    const payload: AptosPayload = {
      "arguments": [amount.toString()],
      "function": `${ownerAddress}::scripts::bidAptosPad`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };

    return this.walletAdapter.signAndSubmitTransaction(payload);
  }

  async setApttSwapConfig(softCap: BigInt, hardCap: BigInt, enableRefund: boolean, aptToApttRate: BigInt): Promise<any> {
    const payload: AptosPayload = {
      "arguments": [softCap.toString(), hardCap.toString(), enableRefund, aptToApttRate.toString()],
      "function": `${ownerAddress}::scripts::setApttSwapConfig`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };

    return this.walletAdapter.signAndSubmitTransaction(payload);
  }

  async resourceOf(accountAddress: MaybeHexString, resourceType: string): Promise<MoveResource | undefined> {
    try {
      return await this.walletAdapter.getResource(accountAddress, resourceType);
    } catch (error: any) {
      console.error(error);

      return undefined;
    }
  }

  async getAptosBalanceOf(accountAddress: MaybeHexString): Promise<string> {
    const resource = await this.resourceOf(accountAddress, "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
    console.log("APT of account " + accountAddress + ":" + JSON.stringify(resource));

    return (resource?.data as any)?.coin?.value as string | "0";
  }

  async getAptosPadBalanceOf(accountAddress: MaybeHexString): Promise<string> {
    const resourceType = `${ownerAddress}::aptospad_coin::AptosPadCoin`;
    const resource = await this.resourceOf(accountAddress, resourceType);
    console.log("APD of account " + accountAddress + ":" + JSON.stringify(resource));

    return (resource?.data as any)?.coin?.value as string | "0";
  }
}
