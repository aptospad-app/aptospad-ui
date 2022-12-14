import {
  ConfigProps, defaultVariables,
  DialectNoBlockchainSdk,
  DialectThemeProvider,
  DialectUiManagementProvider, IncomingThemeVariables,
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
import "./index.scss";
import {DialectDappsIdentityResolver} from "@dialectlabs/identity-dialect-dapps";

export const themeVariables: IncomingThemeVariables = {
  "dark": {
    "bellButton":
      "w-10 h-10 shadow-xl shadow-neutral-800 border border-neutral-600 hover:shadow-neutral-700 bg-white text-black",
    "modal": `${defaultVariables.dark.modal} sm:border border-[#383838]/40 bg-[#141414]` // 0.4 opacity based on trial-and-error
  },
  "animations": {
    "popup": {
      "enter": "transition-all duration-300 origin-top-right",
      "enterFrom": "opacity-0 scale-75",
      "enterTo": "opacity-100 scale-100",
      "leave": "transition-all duration-100 origin-top-right",
      "leaveFrom": "opacity-100 scale-100",
      "leaveTo": "opacity-0 scale-75"
    }
  }
};

export const SdkProvider: FC<any> = (props) => {
  const aptosWallet = useWallet();
  const [dialectAptosWalletAdapter, setDialectAptosWalletAdapter] = useState<DialectAptosWalletAdapter | null>(null);

  const dialectConfig: ConfigProps = useMemo(() => ({
    "environment": "development",
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
        config={dialectConfig}
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
  const walletContext = useWallet();

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <DialectProviders>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <NotificationsButton
        dialectId="dialect-notifications"
        dappAddress={"D1ALECTfeCZt9bAbPWtJk7ntv24vDYGPmyS7swp7DY5h"}
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
