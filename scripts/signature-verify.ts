import {ethers} from "hardhat";

async function recoverAddressFromSignature() {
    // Get signer
    const signer = await ethers.getSigner('0x90F79bf6EB2c4f870365E785982E1f101E93b906');
    
    // Message to sign
    const message = ethers.utils.arrayify(
        ethers.utils.keccak256(
            ethers.utils.defaultAbiCoder.encode(
                ['address', 'uint256', 'bytes'],
                ['0x8464135c8F25Da09e49BC8782676a84730C318bC', 1876049749 , '0x8f3e8b45fa62fc6abf12d73c4feef3c54f0404bea83c85f1159df7de9f8f1944']
            )
        )
    );

    // Sign the message
    const signature = await signer.signMessage(message);
    console.log('the signature is:', signature);

    // Recover address of data signer
    //const recoverAddress= ethers.utils.verifyMessage(ethers.utils.arrayify(message), signature)

    //create prefix
    let messageHash = ethers.utils.hashMessage(message);
    let messageHashBytes = ethers.utils.arrayify(messageHash);

    //const prefixHash = ethers.utils.solidityPack(["string", "bytes32"], ["\x19Ethereum Signed Message:\n32", message])
    const pubKey = ethers.utils.recoverPublicKey(messageHashBytes, signature);
    const recoverAddress = ethers.utils.computeAddress(pubKey);
    console.log('recovered address is:', recoverAddress);
}

// Call the function
recoverAddressFromSignature();
