/**
 * aptos: v1.3.15
 */
import { AptosClient, Types, HexString } from "aptos"; //v1.3.15
import { HippoWalletClient, NetworkConfiguration } from "@manahippo/hippo-sdk"
import { TradeAggregator } from "@manahippo/hippo-sdk"
import { CoinListClient, NetworkType } from "@manahippo/coin-list"
import { DetailedRouteAndQuote } from "@manahippo/hippo-sdk/dist/aggregator/types";
import { OptionTransaction, simulatePayloadTxAndLog, SimulationKeys } from '@manahippo/move-to-ts';
import {WalletNameEmpty, WalletNotFound} from "@/Services/Wallet/errors";


import { WalletContextState, WalletAdapter } from "@manahippo/aptos-wallet-adapter";

// import { GeneralRouteAndQuote, TTransaction } from '../../Types/hippo';
import { AptosWalletAdapter } from "../Wallet/AptosWalletAdapter";

const aptosNodeUrl = process.env.APTOS_FULL_NODE_URL as string | "https://aptos-mainnet.nodereal.io/v1/3e18914c169e4dfaa5824895a8d1def9/v1";
const network = process.env.APTOS_NETWORK_NAME as string | 'testnet'

export class HippoSwap extends AptosWalletAdapter {
  private readonly client: AptosClient;
  private readonly coinList: CoinListClient;
  private hippoWalletClient: HippoWalletClient;

  constructor(walletContextState: WalletContextState) {
    super(walletContextState);
    this.client = new AptosClient(aptosNodeUrl);
    this.coinList = new CoinListClient(network as NetworkType);
    this.hippoWalletClient = new HippoWalletClient(this.client, this.getWalletContextState().account?.address as HexString, { fullNodeUrl: aptosNodeUrl } as NetworkConfiguration, this.coinList);
  }

  listCoin = async (): Promise<any> => {
    try {
      return this.coinList.getCoinInfoList()
    } catch (error) {
      console.log(error)
    }
  }


  aggListQuotes = async (fromSymbol: string, toSymbol: string, inputUiAmt: string): Promise<DetailedRouteAndQuote | null> => {
    console.log("Getting best quote local...");
    const agg = await TradeAggregator.create(this.client)
    console.log(agg)
    const xCoinInfo = this.coinList.getCoinInfoBySymbol(fromSymbol);
    const yCoinInfo = this.coinList.getCoinInfoBySymbol(toSymbol);
    console.log(`xCoinInfo`, xCoinInfo)
    console.log(`yCoinInfo`, yCoinInfo)
    const inputAmt = parseFloat(inputUiAmt);
    const quote = await agg.getBestQuote(inputAmt, xCoinInfo[0], yCoinInfo[0]);
    console.log(`No quote from ${fromSymbol} to ${toSymbol}`);
    console.log(`quote`, quote)
    return quote
  };

  swap = async (isSimulate: Boolean, fromSymbol: string, toSymbol: string, inputUiAmt: string, maxGas: string) => {

    if(isSimulate) return this.simulateAggSwap(fromSymbol, toSymbol, inputUiAmt, maxGas)
    return this.aggSwap(fromSymbol, toSymbol, inputUiAmt, maxGas)
  }

  aggSwap = async (fromSymbol: string, toSymbol: string, inputUiAmt: string, maxGas: string) => {

    const agg = await TradeAggregator.create(this.client)
    console.log(agg)
    const xCoinInfo = this.coinList.getCoinInfoBySymbol(fromSymbol);
    const yCoinInfo = this.coinList.getCoinInfoBySymbol(toSymbol);
    console.log(`xCoinInfo`, xCoinInfo)
    console.log(`yCoinInfo`, yCoinInfo)
    const inputAmt = parseFloat(inputUiAmt);

    const walletName = this.getWalletContextState().wallet?.adapter.name as string;
    const walletAdapter = this.selectAdapter(walletName);

    const quotes = await agg.getQuotes(inputAmt, xCoinInfo[0], yCoinInfo[0]);
    if (quotes.length === 0) {
      console.log('No route available');
      return;
    }
    const options = {
      maxGasAmount: parseFloat(maxGas),
      expireTimestamp: Math.floor(Date.now() / 1000) + 60,
    }
    // first quote also the best quote
    const payload = quotes[0].route.makePayload(inputAmt, 0);
    const result = await walletAdapter?.signAndSubmitTransaction(
      payload as Types.TransactionPayload_EntryFunctionPayload,
      options
    );

    console.log(result)
  };

  simulateAggSwap = async (fromSymbol: string, toSymbol: string, inputUiAmt: string, maxGas: string) => {

    const agg = await TradeAggregator.create(this.client)
    console.log(agg)
    const xCoinInfo = this.coinList.getCoinInfoBySymbol(fromSymbol);
    const yCoinInfo = this.coinList.getCoinInfoBySymbol(toSymbol);
    console.log(`xCoinInfo`, xCoinInfo)
    console.log(`yCoinInfo`, yCoinInfo)
    const inputAmt = parseFloat(inputUiAmt);

    const wallet = this.getWalletContextState().wallet

    const quotes = await agg.getQuotes(inputAmt, xCoinInfo[0], yCoinInfo[0]);
    if (quotes.length === 0) {
      console.log('No route available');
      return;
    }

    const options: OptionTransaction = {
      maxGasAmount: parseFloat(maxGas),
      expireTimestamp: Math.floor(Date.now() / 1000) + 60,
    }
    // first quote also the best quote
    const payload = quotes[0].route.makePayload(inputAmt, 0);
    const publicKey = wallet?.adapter?.publicAccount?.publicKey?.toString();
    const address = wallet?.adapter?.publicAccount?.address?.toString();
    if (!publicKey || !address) {
      return;
    }
    const simkeys: SimulationKeys = {
      pubkey: new HexString(publicKey),
      address: new HexString(address)
    };

    // console.log(`simulate gas availabel: ${gasAvailable}`);
    const result = await simulatePayloadTxAndLog(this.client, simkeys, payload, options, false);
    console.log('simulate swap', result);
    return result;
  };
}
