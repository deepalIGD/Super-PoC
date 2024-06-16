import {ethers} from "hardhat";
import * as fs from 'fs';
async function recoverAddressFromSignature(claimKey: string, claimIssuer: string, IPFSHash: string) {
    // Get signer
    const signer = await ethers.getSigner(claimKey);
    
    // Message to sign
    const message = ethers.utils.arrayify(
        ethers.utils.keccak256(
            ethers.utils.defaultAbiCoder.encode(
                ['address', 'uint256', 'bytes'],
                [claimIssuer, 1876049749 , IPFSHash]
            )
        )
    );

    // Sign the message
    const signature = await signer.signMessage(message);
    console.log('The signature to parse as part of the claim:', signature);
      // Define the file path
    const filePath: string = 'output.txt';

    var mySignature = "Claim Signature: " + signature + '\n'

    // Write the variable value to the file
    fs.writeFile(filePath, mySignature, { flag: 'a' },  (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Variable value has been written to the file successfully.');
    });
}

// Define the file path
const filePath: string = 'output.txt';

// Read the contents of the file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Split the data into lines
    const lines = data.split('\n');

    // Extract the values from the second column of each line
    const claimIssuer = lines[0].split(':')[1].trim();
    const claimKey = lines[2].split(':')[1].trim();
    const IPFSHash = lines[3].split(':')[1].trim();

    // Print the extracted values
    /*console.log('Claim Issuer:', claimIssuer);
    console.log('Claim Key:', claimKey);
    console.log('IPFS Hash:', IPFSHash);*/
    recoverAddressFromSignature(claimKey, claimIssuer, IPFSHash);
});


// Call the function

