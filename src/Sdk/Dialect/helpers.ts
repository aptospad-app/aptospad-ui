/*
  Aptos
*/
import {
  ConfigProps,
  CreateThreadCommand,
  Dialect,
  DialectSdk,
  EncryptionKeysStore,
  FindThreadByIdQuery,
  Thread,
  ThreadId,
  ThreadMemberScope,
  ThreadMessage,
  TokenStore
} from "@dialectlabs/sdk";
import {
  Aptos,
  AptosSdkFactory,
  SignMessagePayload,
  SignMessageResponse,
  WalletAdapterProps
} from "@dialectlabs/blockchain-sdk-aptos";
import {DialectCloudConfigProps, Environment} from "@dialectlabs/sdk/src/sdk/sdk.interface";
import {AccountKeys} from "@dialectlabs/blockchain-sdk-aptos/src/wallet-adapter/dialect-aptos-wallet-adapter.interface";
import {HexString} from "aptos";
import {randomBytes} from "tweetnacl";
import {WalletContextState} from "@manahippo/aptos-wallet-adapter";

export function createAptosSdk(walletContext: WalletContextState): DialectSdk<Aptos> {
  const environment: Environment = process.env.DIALECT_ENVINROMENT as Environment;
  const dialectCloud: DialectCloudConfigProps = {
    "url": process.env.DIALECT_URL as string,
    "tokenStore": TokenStore.createInMemory()
  };
  const encryptionKeysStore = EncryptionKeysStore.createInMemory();
  const aptosChain = {
    "rpcUrl": process.env.APTOS_FULL_NODE_URL as string
  };
  const walletAdapterProps: WalletAdapterProps = {
    "publicAccount": walletContext.account as AccountKeys,
    async signMessage(message: string): Promise<string> {
      const payload: SignMessagePayload = {
        "message": message,
        "nonce": HexString.fromUint8Array(randomBytes(32)).toString()
      };
      const response = await walletContext.signMessage(payload) as SignMessageResponse;
      console.log(response);
      const rawSignature = response.signature;
      const hexSignature = HexString.ensure(rawSignature);

      return hexSignature.toString();
    },
    async signMessagePayload(payload: SignMessagePayload): Promise<SignMessageResponse> {
      return await walletContext.signMessage(payload) as SignMessageResponse;
    }
  };
  const blockChainFactory = AptosSdkFactory.create({
    "wallet": {
      "address": walletAdapterProps.publicAccount.address,
      "publicKey": walletAdapterProps.publicAccount.publicKey,
      "signMessage": walletAdapterProps.signMessage,
      "signMessagePayload": walletAdapterProps.signMessagePayload
    }
  });

  return Dialect.sdk({
    environment,
    encryptionKeysStore
  } as ConfigProps, blockChainFactory);
}

export async function createAptosThread(sdk: DialectSdk<Aptos>, recipient: string): Promise<Thread> {
  // console.log({recipient: recipient.slice(2)});
  // const decoded = bs58.decode(recipient.slice(2));
  // console.log({decoded});
  const command: CreateThreadCommand = {
    "encrypted": false,
    "me": {
      "scopes": [ThreadMemberScope.ADMIN, ThreadMemberScope.WRITE]
    },
    "otherMembers": [
      {
        "address": recipient,
        "scopes": [ThreadMemberScope.ADMIN, ThreadMemberScope.WRITE]
      }
    ]
  };

  return await sdk.threads.create(command);
}

export async function getAptosThreads(sdk: DialectSdk<Aptos>): Promise<Thread[]> {
  const threads: Thread[] = await sdk.threads.findAll();

  return threads;
}

export async function getAptosThread(sdk: DialectSdk<Aptos>, query: FindThreadByIdQuery): Promise<Thread | null> {
  return await sdk.threads.find(query);
}

export async function getAptosMessages(sdk: DialectSdk<Aptos>, threadId: ThreadId): Promise<ThreadMessage[]> {
  const query: FindThreadByIdQuery = {
    "id": threadId
  };
  const thread = await sdk.threads.find(query);
  if (!thread) {
    console.log("No thread found with id", threadId);

    return [];
  }

  return await thread.messages();
}
