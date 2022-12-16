/**
 * aptos: v1.3.15
 */
import { AptosClient, AptosAccount } from "aptos"; //v1.3.15
import { TradeAggregator, } from "@manahippo/hippo-sdk"
import { CoinListClient, NetworkType } from "@manahippo/coin-list"
import { DetailedRouteAndQuote } from "@manahippo/hippo-sdk/dist/aggregator/types";

import { sendPayloadTxLocal } from "@manahippo/hippo-sdk/dist/tools/utils"



const aptosNodeUrl = process.env.APTOS_FULL_NODE_URL as string | "";
const network = process.env.APTOS_NETWORK_NAME as string | 'testnet'

export class HippoSwap {

  private readonly aptosClient: AptosClient;
  private readonly coinList: CoinListClient;

  constructor() {
    this.aptosClient = new AptosClient(aptosNodeUrl);
    this.coinList = new CoinListClient(network as NetworkType)
  }


  aggListQuotes = async (fromSymbol: string, toSymbol: string, inputUiAmt: string): Promise<DetailedRouteAndQuote | null> => {
    console.log("Getting best quote local...");
    const agg = await TradeAggregator.create(this.aptosClient)
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

  aggSwap = async (fromSymbol: string, toSymbol: string, inputUiAmt: string, simulation: string, maxGas: string, account: AptosAccount) => {

    const agg = await TradeAggregator.create(this.aptosClient)
    console.log(agg)
    const xCoinInfo = this.coinList.getCoinInfoBySymbol(fromSymbol);
    const yCoinInfo = this.coinList.getCoinInfoBySymbol(toSymbol);
    console.log(`xCoinInfo`, xCoinInfo)
    console.log(`yCoinInfo`, yCoinInfo)
    const inputAmt = parseFloat(inputUiAmt);

    const isSimulation = simulation == "true"

    const quotes = await agg.getQuotes(inputAmt, xCoinInfo[0], yCoinInfo[0]);
    if (quotes.length === 0) {
      console.log('No route available');
      return;
    }
    // first quote also the best quote
    const payload = quotes[0].route.makePayload(inputAmt, 0);
    await sendPayloadTxLocal(isSimulation, this.aptosClient, account, payload, maxGas);
  };
}
