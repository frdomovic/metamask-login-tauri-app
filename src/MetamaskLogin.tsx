import { MetaMaskInpageProvider } from '@metamask/providers';
import MetaMaskSDK from '@metamask/sdk';
import React, { useEffect, useState } from 'react';

const options = {
  dappMetadata: {
    name: 'YourDAppName',
    url: 'https://yourdapp.com',
  },
  injectProvider: true,
};

const MMSDK = new MetaMaskSDK(options);
     // @ts-expect-error
const ethereum = MMSDK.getProvider() as MetaMaskInpageProvider;

const MetaMaskLogin = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const connectMetaMask = async () => {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
             // @ts-expect-error
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    };

    connectMetaMask();
  }, []);

  return (
    <div>
      {account ? (
        <div>Connected Account: {account}</div>
      ) : (
        <div>Scan the QR code with MetaMask mobile app to log in</div>
      )}
    </div>
  );
};

export default MetaMaskLogin;
