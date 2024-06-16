import {ethers} from "hardhat";
import * as fs from 'fs';

async function main() {
  const [claimIssuerOwner] = await ethers.getSigners();
  console.log('the claim issuer owner is:', claimIssuerOwner);
  const claimIssuer = await ethers.deployContract("ClaimIssuer", [claimIssuerOwner.address]);

  console.log(`Deploying Claim Issuer at ${claimIssuer.address} ...`);

  await claimIssuer.deployed();

  console.log(`Deployed Claim Issuer ${claimIssuer.address} !`);
  
  //create a file and write to file

  // Define the file path
const filePath: string = 'output.txt';

var claimIssuerAddress = "Claim Issuer contract: " + claimIssuer.address + '\n'
// Write the variable value to the file
  fs.writeFile(filePath, claimIssuerAddress, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('Variable value has been written to the file successfully.');
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
