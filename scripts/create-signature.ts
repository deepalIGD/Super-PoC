import {ethers} from "hardhat";

async function main(){
    const signer = await ethers.getSigner('0x90F79bf6EB2c4f870365E785982E1f101E93b906');
    const signature = await signer.signMessage(ethers.utils.arrayify(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'bytes'], ['0x5FbDB2315678afecb367f032d93F642f64180aa3', '1876049749', '0x8f3e8b45fa62fc6abf12d73c4feef3c54f0404bea83c85f1159df7de9f8f1944']))));
    console.log('the signature is:', signature)

   /*var output = await keccak256('0x5FbDB2315678afecb367f032d93F642f64180aa3', 1876049749 , '0x8f3e8b45fa62fc6abf12d73c4feef3c54f0404bea83c85f1159df7de9f8f1944')
   console.log("the hash value is:", output);
   const signer = await ethers.getSigner('0x90F79bf6EB2c4f870365E785982E1f101E93b906');
   const signature = await signer.signMessage(ethers.utils.arrayify(output));
   console.log("the signature is:", signature);*/

   //reverse signature test
   const dataHash = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'bytes'], ['0x5FbDB2315678afecb367f032d93F642f64180aa3', '1876049749', '0x8f3e8b45fa62fc6abf12d73c4feef3c54f0404bea83c85f1159df7de9f8f1944']))
   //bytes32 dataHash = keccak256(abi.encode(_identity, claimTopic, data));
   // Use abi.encodePacked to concatenate the message prefix and the message to sign.
   const prefixHash = ethers.utils.solidityPack(["string", "bytes32"], ["\x19Ethereum Signed Message:\n32", dataHash])
   //bytes32 prefixedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", dataHash));

   // Recover address of data signer
   const sig = ethers.utils.splitSignature(signature);
   const myAddress = ethers.utils.recoverAddress(prefixHash, sig);
   console.log('recovered address is:', myAddress);


}

function keccak256(identityHolderAddress: string, topic: number, data: string): string {
    const abiEncoded = ethers.utils.defaultAbiCoder.encode(["address", "uint256", "bytes"], [identityHolderAddress, topic, data]);
 

    return ethers.utils.keccak256(abiEncoded);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });