import {ethers} from "hardhat";

async function main() {
            const claim = {
              issuer: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
              topic: 42,
              scheme: 1,
              data: '0x0042',
              signature: '',
              uri: 'https://example.com',
            };

    //priv key - 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
    const [deployer] = await ethers.getSigners();
        
    //_identity, claimTopic, data
    claim.signature = await deployer.signMessage(ethers.utils.arrayify(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'bytes'], [claim.issuer, claim.topic, claim.data]))));

    console.log(claim.signature);

    /*
        uint256 _topic,
        uint256 _scheme,
        address _issuer,
        bytes memory _signature,
        bytes memory _data,
        string memory _uri
    */
   
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  