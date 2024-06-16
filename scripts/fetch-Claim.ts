//a variable of this topic plus a number, and the issuer (identity contract address)
//start topic - 1876049748
const hre = require("hardhat")
import {ethers} from "hardhat";
import fs from 'fs';
import crypto from 'crypto';

async function main(){

      // Define the file path
     const filePath: string = 'output.txt';

    // Read the contents of the file
    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
      const signer = await ethers.getSigner('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');  
      // Split the data into lines
      const lines = data.split('\n');

      // Extract the values from the second column of each line
      const claimIssuer = lines[0].split(':')[1].trim();
      const tokenAddress = lines[1].split(':')[1].trim();
      const claimKey = lines[2].split(':')[1].trim();
      const IPFSHash = lines[3].split(':')[1].trim();
      console.log("The claimIssuer is:", claimIssuer.toString())
      console.log("The token address is:", tokenAddress)
      console.log("The claimKey is:", claimKey)
      console.log("The IPFS hash is:", IPFSHash)

    
      const identity = await hre.ethers.getContractAt('Identity', claimIssuer.toString(), signer);

      var _issuer = claimIssuer.toString()
      var _topic = '1876049749'
      //abi encode
      var claimId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address', 'uint256'], [_issuer, _topic]))

      const output = await identity.getClaim(claimId);
      console.log(output);
      //maybe get the data from IPFS here

      
      fs.readFile('employees.json', 'utf8', async (err, jsonString) => {
        if (err) {
          console.log('Error reading file:', err);
          return;
        }
        try {
            //derive local hash  
            // Parse JSON string to object
            const jsonData = JSON.parse(jsonString);
      
            // Stringify JSON object
            const jsonStringified = JSON.stringify(jsonData, null, 2);
        
            //console.log('JSON data:', jsonStringified);
  
            const hashedString = hashString(jsonStringified);  
            var finalHashedString = '0x' + hashedString
            //if IPFS hash and local hash are equal
            console.log('ipfs hash of employee data:', output.data);
            console.log('The locally hashed employee data', finalHashedString);
            if (finalHashedString == output.data){
                console.log('===============The local hash and IPFS hash are equal, trigger token payment===================')
                console.log('performing batch payment.........')
                
                for (var i=0; i < jsonData.length; i++){

                    //console.log("address", i, jsonData[i].Address);
                    await myMint(tokenAddress, jsonData[i].Address, 1000000000000) 
                }

            }else {
                console.log("=========================IPFS hashes are not equal, won't perform batch payment!")
            }

        } catch(err) {
            console.log('Error parsing JSON string:', err);
        }
    });

    });
}

async function myMint(tokenAddress: string, to: string, value: number) {
    const [Owner] = await ethers.getSigners();
  
    //read token contract address

    const token = await hre.ethers.getContractAt('A$DC', tokenAddress, Owner);

    var thisAddress = ethers.utils.getAddress(to);
    const tx = await token.mint(thisAddress, value);

    await tx.wait();
    console.log(`mint to address ${to}, tx hash is: ${tx.hash} !`);
    
  }
/*
async function myDeploy() {
    const [Owner] = await ethers.getSigners();
    console.log('the token owner is:', Owner.address);
  
    const gasPrice = ethers.utils.parseUnits('4000', 'gwei'); // Adjust the '10' as needed
    const gasLimit = 30000000; // Adjust this value based on your needs
    const tokenFactory = await ethers.getContractFactory("A$DC");
  
    const token = await tokenFactory.connect(Owner).deploy({ gasPrice: gasPrice, gasLimit: gasLimit });
    
    console.log(`Deploying token at ${token.address} ...`);
    await token.deployed();
    console.log(`Deployed token ${token.address} !`);
 
    
  }
*/  

// Function to hash a string using SHA-256
function hashString(inputString: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });