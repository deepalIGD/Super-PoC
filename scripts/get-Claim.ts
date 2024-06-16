//a variable of this topic plus a number, and the issuer (identity contract address)
//start topic - 1876049748
const hre = require("hardhat")
import {ethers} from "hardhat";
import fs from 'fs';
import crypto from 'crypto';

async function main(){

    //const signer = await hre.ethers.getSigner('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    const signer = await ethers.getSigner('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
    const identity = await hre.ethers.getContractAt('Identity', '0x5FbDB2315678afecb367f032d93F642f64180aa3', signer);

    var _issuer = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    var _topic = '1876049749'
    //abi encode
    var claimId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address', 'uint256'], [_issuer, _topic]))

    const output = await identity.getClaim(claimId);
    console.log(output);
    console.log('ipfs published data hash:', output.data);
    /*
    var hashedDataPrefixed;
    //Fund Admin compares with locally hashed data
    const filePath = '../solidity/data.json';

     // Read the file synchronously
     const data: Buffer = fs.readFileSync(filePath);
    
     // Convert the data to a string if it's a text file
     const fileContent: string = data.toString();

     const jsonData = JSON.parse(fileContent);

     // Stringify JSON object
     const jsonStringified = JSON.stringify(jsonData, null, 2);

     const hash = crypto.createHash('sha256');
     hash.update(jsonStringified);
     const hashedData = hash.digest('hex');
     hashedDataPrefixed = '0x' + hashedData;
     console.log("locally hashed data is:", hashedDataPrefixed);

    //compare the two hashes
    if (hashedDataPrefixed.toString() == (output.data).toString()){
        console.log('The local hash of employee data and IPFS hash registered on contract match!!');

        //trigger split transaction -A$DC currency forwarder




    }

    //await tx.wait();
    console.log(`Get claim of topic ${_topic} on identity ${_issuer}`);
    */
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });