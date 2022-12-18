/*
  Aptos
*/
import {
  ConfigProps,
  CreateThreadCommand, Dapp,
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

export function createAptosSdk(keyStore?: string): DialectSdk<Aptos> {
  const environment: Environment = process.env.DIALECT_ENVINROMENT as Environment;
  const dialectCloud: DialectCloudConfigProps = {
    "tokenStore": TokenStore.createInMemory()
  };
  const encryptionKeysStore = EncryptionKeysStore.createInMemory();
  const privateKey = Buffer.from(keyStore || process.env.DIALECT_KEY_STORE as string, "hex");
  const sdkFactory = AptosSdkFactory.create({"wallet": NodeDialectAptosWalletAdapter.create(privateKey)});

  return Dialect.sdk({
    environment,
    encryptionKeysStore,
    dialectCloud
  } as ConfigProps, sdkFactory);
}

export async function createSdkDapp(sdk: DialectSdk<Aptos>): Promise<Dapp> {
  const dapp = await sdk.dapps.find();

  return dapp || await sdk.dapps.create({
    "name": "Aptospad Dapp",
    "description": "Aptospad sdk dapp"
  });
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
