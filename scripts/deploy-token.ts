import {ethers} from "hardhat";
import * as fs from 'fs';

async function main() {
  const [Owner] = await ethers.getSigners();
  console.log('the token owner is:', Owner.address);

  const gasPrice = ethers.utils.parseUnits('4000', 'gwei'); // Adjust the '10' as needed
  const gasLimit = 30000000; // Adjust this value based on your needs
  const tokenFactory = await ethers.getContractFactory("A$DC");

  const token = await tokenFactory.connect(Owner).deploy({ gasPrice: gasPrice, gasLimit: gasLimit });
  
  console.log(`Deploying token at ${token.address} ...`);
  await token.deployed();
  console.log(`Deployed token ${token.address} !`);
  
  const filePath: string = 'output.txt';
  var tokenAddress = "Token contract: " + token.address + '\n'
// Write the variable value to the file
  fs.writeFile(filePath, tokenAddress, { flag: 'a' }, (err) => {
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
