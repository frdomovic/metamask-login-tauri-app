import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';

const MetaMaskLogin = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectMetaMaskMobile = () => {
    const link = `https://metamask.app.link/dapp/yourdapp.com`; // Replace with your dapp URL
    window.open(link, '_blank');
  };

  useEffect(() => {
    const connectMetaMask = async () => {
      try {
        // @ts-expect-error
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
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
        <div>
          <p>Scan the QR code with MetaMask mobile app to log in.</p>
          <QRCode value="https://metamask.app.link/dapp/http://localhost:1420/" size={256} />
          <button onClick={connectMetaMaskMobile}>Open MetaMask Mobile</button>
        </div>
      )}
    </div>
  );
};

export default MetaMaskLogin;
