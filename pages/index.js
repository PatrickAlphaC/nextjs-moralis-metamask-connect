import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi";
import { useState, useEffect } from "react";

export default function Home() {
  const [hasMetamask, setHasMetamask] = useState(false);
  const { enableWeb3, isWeb3Enabled } = useMoralis();

  const { data, error, runContractFunction, isFetching, isLoading } =
    useWeb3Contract({
      abi: abi,
      contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // your contract address here
      functionName: "store",
      params: {
        _favoriteNumber: 42,
      },
    });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  return (
    <div>
      {hasMetamask ? (
        isWeb3Enabled ? (
          "Connected! "
        ) : (
          <button onClick={() => enableWeb3()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}

      {isWeb3Enabled ? (
        <button onClick={() => runContractFunction()}>Execute</button>
      ) : (
        ""
      )}
    </div>
  );
}
