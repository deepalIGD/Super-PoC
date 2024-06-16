import Moralis from "moralis";
import fs from "fs";
import crypto from 'crypto';

/*
ABN, USI, Family Name, Given Name, and DOB 
*/

// Take a hash of the data in data.json

// Read JSON data from file
fs.readFile('employees.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.log('Error reading file:', err);
      return;
    }
    
    try {
      // Parse JSON string to object
      const jsonData = JSON.parse(jsonString);
      
      // Stringify JSON object
      const jsonStringified = JSON.stringify(jsonData, null, 2);
      
      //console.log('JSON data:', jsonStringified);

      const hashedString = hashString(jsonStringified);  
      // Upload the hash to IPFS
      console.log("Uploading Hash:", hashedString);

    // Define the file path
    const filePath: string = 'output.txt';
     //save IPFS hash in output.txt
     var myhashedString = "IPFS hash: " + '0x' + hashedString + '\n';
     fs.writeFile(filePath, myhashedString, { flag: 'a' },  (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Variable value has been written to the file successfully.');
    });   

      uploadToIpfs(hashedString);  

    } catch(err) {
      console.log('Error parsing JSON string:', err);
    }
  });

async function uploadToIpfs(hashedString: string): Promise<void> {
    const fileUploads = [
        {
            path: "hashedEmployeedetails.json",
            content: hashedString
        }
      ];
    await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjNhY2FkM2FiLTM2NjQtNDc3OS05N2FmLTY1YWU2ZWJjODQ0MCIsIm9yZ0lkIjoiMzg2OTQwIiwidXNlcklkIjoiMzk3NTg0IiwidHlwZUlkIjoiM2Y4ZTI2ODctY2Q2OC00NjVhLThiZjQtMGEwZDlkNjY3YWU2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTI1NDgwMjMsImV4cCI6NDg2ODMwODAyM30.nAAKGHQqmRP_ck86v_X3JVrhdSn5OCWhqaOfXs6ZdFQ"
    });
    const res = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: fileUploads
    });

    console.log(res.result[0].path);
    //write IPFS path to output.txt

     // Define the file path
    const filePath: string = 'output.txt';

    var IPFSPath = "IPFS path: " + res.result[0].path + '\n'
    // Write the variable value to the file
    fs.writeFile(filePath, IPFSPath, { flag: 'a' }, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Variable value has been written to the file successfully.');
    });
}

// Function to hash a string using SHA-256
function hashString(inputString: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}
