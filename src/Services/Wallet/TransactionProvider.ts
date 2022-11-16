export abstract class TransactionProvider {
  abstract sendTransactionOnAptos(txPram: TxParam, payload: AptosPayload): Promise<any>;
}

export interface AptosPayload {
  function: string,
  type_arguments: string[],
  arguments: any[],
  type: string
}

export interface TxParam {
  sender: string,
  options?: any
}
