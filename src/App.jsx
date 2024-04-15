import {Web3} from 'web3';
import Abi from './ABI.json';
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [contract,setContract] = useState('');
  const [connectedAccount, setConnectedAccount]=useState('');
  const [token, setToken]= useState('');
  const connectMetamask = async ()=>{
    if(window.ethereum){
      // console.log("meta mask is install");
      // const provider = "https://eth-sepolia.g.alchemy.com/v2/_cVT0ylREcLRRyJpmESunOsRAxUPtixr";
      const provider = window.ethereum;
      const web3 = new Web3(provider);
      const contractAddress = "0xAA185c64E4aE21907Bbc5363e064BC7314A20b4D";
      const accouts = await window.ethereum.request({method:'eth_accounts'})
      setConnectedAccount(accouts[0])
      const contractInstance = new web3.eth.Contract(Abi, contractAddress);
      
      // console.log(accouts[0]);
      setContract(contractInstance);
      console.log(contractInstance);
    }
    else{
      console.log("meta mask is not install");
    }
  }
  const transferToken = async () => {
    const to = "0x2e8E610Aff4ee99A3e2cE5e366f4f437EB63524a";
    const amount = "1000000000000000000";
  
    if (contract) {
      try {
        await contract.methods.transfer(to, amount).send({ from: connectedAccount });
        console.log('Transfer successful');
      } catch (error) {
        console.error('Error during transfer:', error);
      }
    } else {
      console.error('Contract is not defined');
    }
  };
  
  
  useEffect (()=>{
    const fetchTokenSymbole=async()=>{
      const token =await contract.methods.symbol().call()
      // console.log(token);
      setToken(token);
    }
    contract && fetchTokenSymbole()
  },[contract])
  return (
    <>
      <h1>Jay Shree Ram</h1>
      {token}
      <br></br>
      <button onClick={transferToken}>Transfer BLK</button>
      <br></br> 
      <button onClick={connectMetamask}>ConnectMeta</button>
    </>
  )
}

export default App
