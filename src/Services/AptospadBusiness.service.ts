import {AptosPayload, AptosWalletAdapter} from "@/Services/Wallet/AptosWalletAdapter";
import {WalletContextState} from "@manahippo/aptos-wallet-adapter";
import {MaybeHexString} from "aptos";
import BaseService from "@/Services/Base.service";

const APTOSPAD_SOURCE_ADDRESS = process.env.APTOSPAD_SOURCE_ADDRESS as string;
const APTOSPAD_ADDRESS = process.env.APTOSPAD_ADDRESS as string;
const PRICE_URL = process.env.PRICE_URL as string;

export class AptospadBusinessService extends BaseService {
  private walletAdapter: AptosWalletAdapter;

  constructor(walletContext: WalletContextState) {
    super();
    this.walletAdapter = new AptosWalletAdapter(walletContext);
  }

  async withdrawAptosPad(debitAddress: string, amount: BigInt): Promise<any> {
    const payload: AptosPayload = {
      "arguments": [debitAddress, amount.toString()],
      "function": `${APTOSPAD_ADDRESS}::scripts::withdrawAptosPad`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };

    return this.walletAdapter.signAndSubmitTransaction(payload);
  }

  async bidAptosPad(amount: BigInt): Promise<{hash: string} | undefined> {
    const payload: AptosPayload = {
      "arguments": [amount.toString()],
      "function": `${APTOSPAD_ADDRESS}::scripts::bidAptosPad`,
      "type_arguments": [],
      "type": "entry_function_payload"
    };

    return this.walletAdapter.signAndSubmitTransaction(payload);
  }

  async getAptosBalanceOf(accountAddress: MaybeHexString): Promise<string> {
    const resource = await this.walletAdapter.resourceOf(accountAddress, "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");

    return (resource?.data as any)?.coin?.value as string | "0";
  }

  async getAptosPadBalanceOf(accountAddress: MaybeHexString): Promise<string> {
    const resourceType = `${APTOSPAD_ADDRESS}::aptospad_coin::AptosPadCoin`;
    const resource = await this.walletAdapter.resourceOf(accountAddress, resourceType);
    console.log("APD of account " + accountAddress + ":" + JSON.stringify(resource));

    return (resource?.data as any)?.coin?.value as string | "0";
  }

  async getApttSwapConfig(): Promise<ApttSwapConfig> {
    try {
      const resourceType = `${APTOSPAD_ADDRESS}::config::ApttSwapConfig`;
      const response = await this.walletAdapter.resourceOf(APTOSPAD_SOURCE_ADDRESS, resourceType);

      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error("Cannot load AptospadConfig.");
    }
  }

  async getLaunchPadRegistry(): Promise<LaunchPadRegistry> {
    try {
      const resourceType = `${APTOSPAD_ADDRESS}::aptospad_swap::LaunchPadRegistry`;
      const response = await this.walletAdapter.resourceOf(APTOSPAD_SOURCE_ADDRESS, resourceType);

      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error("Cannot load LunchPadRegistry.");
    }
  }

  // @TODO
  async fundAccount(address: MaybeHexString, amount: number): Promise<string[] | undefined> {
    try {
      console.log("Funding..." + address + "," + amount);
      const response = await this.walletAdapter.faucetClient.fundAccount(address, amount);
      console.log("Aptos fund to account " + address + " amount " + amount + ":");
      console.log(response);

      return response;
    } catch (error: any) {
      console.log(error);

      return undefined;
    }
  }

  async loadPriceOfAPT(): Promise<{ price: string }> {
    try {
      const response = await this.axiosInstance().get(`${PRICE_URL}?symbol=APTUSDT`);

      return response.data as { price: string };
    } catch (error: any) {
      throw new Error("Cannot get price of APT from Binance");
    }
  }
}

export interface ApttSwapConfig {
  emgergency?: boolean,
  softCap?: number,
  hardCap?: number,
  refund?: number,
  aptToApttRate: number,
  state?: number,
  bypassWhiteList?: boolean
}

export interface LaunchPadRegistry {
  investors?: any,
  totalBid: number,
  bidaptospad_events?: any,
  distributeaptospad_events?: any,
  whitelist_events?: any,
}
