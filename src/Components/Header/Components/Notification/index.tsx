import {
  ConfigProps,
  DialectNoBlockchainSdk,
  DialectThemeProvider,
  DialectUiManagementProvider,
  NotificationsButton
} from "@dialectlabs/react-ui";
import {FC, useEffect, useMemo, useState} from "react";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {
  DialectAptosWalletAdapter
} from "@dialectlabs/blockchain-sdk-aptos/src/wallet-adapter/dialect-aptos-wallet-adapter.interface";
import {AptosConfigProps} from "@dialectlabs/blockchain-sdk-aptos";
import {aptosWalletToDialectWallet} from "@/Utilities/Wallet.utility";
import {DialectAptosSdk} from "@dialectlabs/react-sdk-blockchain-aptos";
import "@dialectlabs/react-ui/index.css";
import {DialectDappsIdentityResolver} from "@dialectlabs/identity-dialect-dapps";

export const SdkProvider: FC<any> = (props) => {
  const aptosWallet = useWallet();
  const [dialectAptosWalletAdapter, setDialectAptosWalletAdapter] = useState<DialectAptosWalletAdapter | null>(null);

  const dialectConfig = useMemo(() => ({
    "environment": process.env.NODE_ENV as string | "production",
    "dialectCloud": {
      "tokenStore": "local-storage"
    },
    "identity": {
      "resolvers": [
        new DialectDappsIdentityResolver()
      ]
    }
  }), []);

  // @ts-ignore
  const aptosConfig: AptosConfigProps = useMemo(() => ({
    "wallet": dialectAptosWalletAdapter
  }), [dialectAptosWalletAdapter]);

  useEffect(() => {
    setDialectAptosWalletAdapter(aptosWalletToDialectWallet(aptosWallet));
  }, [aptosWallet]);

  // If our wallet has been initialized, then switch to Solana SDK provider
  if (dialectAptosWalletAdapter) {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <DialectAptosSdk
        aptosConfig={aptosConfig}
        config={dialectConfig as ConfigProps}
        gate={() => new Promise((resolve) => setTimeout(() => resolve(true), 3000))}
      >
        {props.children}
      </DialectAptosSdk>
    );
  }

  // eslint-disable-next-line react/react-in-jsx-scope
  return <DialectNoBlockchainSdk>{props.children}</DialectNoBlockchainSdk>;
};

const DialectProviders: FC<any> = ({children}) => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <SdkProvider>
      {/* eslint-disable-next-line react/jsx-no-undef,react/react-in-jsx-scope */}
      <DialectThemeProvider theme={"light"}>
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <DialectUiManagementProvider>
          {children}
        </DialectUiManagementProvider>
      </DialectThemeProvider>
    </SdkProvider>
  );
};

export default function Notifications() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <DialectProviders>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <NotificationsButton
        dialectId="dialect-notifications"
        dappAddress={process.env.DIALECT_DAPP_ADDRESS as string}
        notifications={[
          {
            "name": "Welcome message",
            "detail": "On signup"
          }
        ]}
        pollingInterval={15000}
        channels={["web3"]}
      />
    </DialectProviders>
  );
};
