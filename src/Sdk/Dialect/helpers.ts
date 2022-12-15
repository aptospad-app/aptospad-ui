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
import {Aptos, AptosSdkFactory, NodeDialectAptosWalletAdapter} from "@dialectlabs/blockchain-sdk-aptos";
import {DialectCloudConfigProps, Environment} from "@dialectlabs/sdk/src/sdk/sdk.interface";
import {WalletContextState} from "@manahippo/aptos-wallet-adapter";
import {aptosWalletToWalletAdapterProps} from "@/Utilities/Wallet.utility";
import {Buffer} from "buffer";

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
  const walletAdapterProps = aptosWalletToWalletAdapterProps(walletContext);
  const blockChainFactory = AptosSdkFactory.create({
    "wallet": {
      "address": walletAdapterProps?.publicAccount.address,
      "publicKey": walletAdapterProps?.publicAccount.publicKey,
      "signMessage": walletAdapterProps?.signMessage,
      "signMessagePayload": walletAdapterProps?.signMessagePayload
    }
  });

  return Dialect.sdk({
    environment,
    encryptionKeysStore
  } as ConfigProps, AptosSdkFactory.create({"wallet": NodeDialectAptosWalletAdapter.create(Buffer.from("dee3b784d703cb32e97cab2fb956f12b87d3dbc4026b285a41420b40e0b7959e", "hex"))}));
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
