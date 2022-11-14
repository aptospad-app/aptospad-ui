export class WalletError extends Error {
  public error: any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(message?: string, error?: any) {
    super(message);
    this.error = error;
  }
}

export class WalletNotFound extends WalletError {
  "name" = "WalletNotFound";
}

export class WalletNameEmpty extends WalletError {
  "name" = "WalletNameEmpty";
}

export class WalletGenerateError extends WalletError {
  "name" = "GenerateTransactionFailed";
}

export class WalletSignError extends WalletError {
  "name" = "SignTransactionError";
}
