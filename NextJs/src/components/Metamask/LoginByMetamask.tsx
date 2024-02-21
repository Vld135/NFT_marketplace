"use client"
import { ethers } from "ethers";
import Button from "../Button";
import { getNonce, loginByMetamask } from "@/actions/(auth)/login";

const LoginByMetamask = () => {
  const onLogin = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();


      const adress = await signer.getAddress();

      const nonceResp = await getNonce(adress);

      if (nonceResp.error) {
        console.log(nonceResp.error)
      }
      const message = `Login to ${adress} nonce: ${nonceResp.nonce}`;
      const signedMessage = await signer.signMessage(message);

      const loginResp = await loginByMetamask({
        message, signature: signedMessage, adress
      });

      if (loginResp?.error) {
        console.log(loginResp.error)
      }
    }
  }

  return (
    <Button
      color="amber"
      onClick={onLogin}>
      Login with Metamask
    </Button>
  );
}

export default LoginByMetamask;
