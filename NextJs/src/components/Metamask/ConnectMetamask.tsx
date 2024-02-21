"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { connectMetamask } from "@/actions/(authorized)/connectMetamask";
import Button from "../Button";

interface IConnectMetamaskProps {
  isConnected: boolean;
  email: string;
}

const ConnectMetamask = ({ isConnected, email }: IConnectMetamaskProps) => {
  const [errorMsg, setErrorMsg] = useState("");
  const onConnect = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const adress = await signer.getAddress();
      const message = `Connect wallet to ${email}`;

      const signature = await signer.signMessage(message);

      const { error } = await connectMetamask({
        message,
        signature,
        adress,
        email,
      });

      if (error) {
        setErrorMsg(error);
      }
    }
  };

  return (
    <>
      <Button color="amber" disabled={isConnected} onClick={onConnect}>
        {!isConnected ? "Connect Metamask" : "Metamask is connected!"}
      </Button>
      {errorMsg && <div className="text-red-500 text-sm font-medium">{errorMsg}</div>}
    </>
  );
};

export default ConnectMetamask;
