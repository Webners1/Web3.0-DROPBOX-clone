//import DStorage from '../abis/DStorage.json'
import React, { Component,useState,useEffect } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';
import Dstorage from '../abis/DStorage.json'

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
function App() {
  let [loading, setLoading] = useState(false)
  let [fileTYPE, setFileType] = useState()
  let [buffer, setBuffer] = useState()
  let [fileName, setfileName] = useState()
  let [files, setFile] = useState([])
  let [description, setDescription] = useState()
  let [fileCount, setFileCount] = useState(0)
  let [dstorage, setDstorage] = useState()
let[account,setAccount] = useState()

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockchainData=async()=>{
    const web3 = window.web3
    //Declare Web3
setAccount(account = (await web3.eth.getAccounts())[0])
    //Load account
const networkId = await web3.eth.net.getId()
    let netId = Dstorage.networks[networkId]
    if(netId){
      const abi = Dstorage.abi
      setDstorage(dstorage = new web3.eth.Contract(abi, netId.address))
      setFileCount(fileCount = await dstorage.methods.fileId().call());
      console.log(fileCount)
      for (var i = fileCount;i>=1;i--){
      const file = await dstorage.methods.files(i).call()
      console.log(file)
      setFile(files = [...files,file])
    }
    
    }
    //Network ID

    //IF got connection, get data from contracts
      //Assign contract

      //Get files amount

      //Load files&sort by the newest

    //Else
      //alert Error

  }
const init=async()=>{
  await loadWeb3()
  await loadBlockchainData()
}
  // Get file from user
  const captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload=()=>{
      setBuffer(buffer = Buffer(reader.result))
setFileType(fileTYPE=file.type)
setfileName(fileName = file.name)
    }
  }


  //Upload File
  const uploadFile = description => {
    //Add file to the IPFS
    ipfs.add(buffer,(err,result)=>{
      console.log(result)
if(err){
  window.alert(err)

}
      setLoading(true)
      if(fileTYPE===''){
        setFileType('none')
      }
      console.log(dstorage)
      dstorage.methods.UploadFile(result[0].hash, result[0].size, fileTYPE, fileName, description).send({from:account}).on('transactionHash',(hash)=>{
        setLoading(false)
        setFileType(null)
        setfileName(null)
        window.location.reload()  
      }).on('error',(e)=>{
        window.alert(e)
        setLoading(false)
      })
})
      //Check If error
        //Return error

      //Set state to loading

      //Assign value for the file without extension

      //Call smart contract uploadFile function 

  }

useEffect(()=>{
init()
}, [buffer])
  //Set states
 

    return (
      <div>
        <Navbar account={account} />
        {loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={files}
              captureFile={captureFile}
              uploadFile={uploadFile}
            />
        }
      </div>
    );
  
}

export default App;