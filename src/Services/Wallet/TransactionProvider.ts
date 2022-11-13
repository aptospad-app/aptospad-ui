export abstract class TransactionProvider {
  abstract sendTransactionOnAptos(txPram: TxParam, payload: AptosPayload): Promise<any>;
}

export interface AptosPayload {
  function: string,
  type_arguments: Array<string>,
  arguments: Array<any>,
  type: string
}

export interface TxParam {
  sender: string,
  options: any
}
