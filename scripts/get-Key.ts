//a variable of this topic plus a number, and the issuer (identity contract address)
//start topic - 1876049748
const hre = require("hardhat")
import {ethers} from "hardhat";
import fs from 'fs';
import crypto from 'crypto';

async function main(){

    //const signer = await hre.ethers.getSigner('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    const signer = await ethers.getSigner('0x90F79bf6EB2c4f870365E785982E1f101E93b906');
    const identity = await hre.ethers.getContractAt('ClaimIssuer', '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e', signer);
    console.log('hashing key')
    const keyHash = hre.ethers.utils.keccak256(
        hre.ethers.utils.defaultAbiCoder.encode(['address'], ['0x90F79bf6EB2c4f870365E785982E1f101E93b906']),
      );
    console.log('the key hash is:', keyHash)  
    const output = await identity.getKey(keyHash);
    console.log('the key details', output);
   
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });