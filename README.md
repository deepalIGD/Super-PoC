![OnchainID Smart Contracts](./onchainid_logo_final.png)
---

![GitHub](https://img.shields.io/github/license/onchain-id/solidity?color=green)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/onchain-id/solidity)
![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/onchain-id/solidity/publish-release.yml)
![GitHub repo size](https://img.shields.io/github/repo-size/onchain-id/solidity)
![GitHub Release Date](https://img.shields.io/github/release-date/onchain-id/solidity)

---
# OnchainID Smart Contracts

Smart Contracts for secure Blockchain Identities, implementation of the ERC734 and ERC735 proposal standards.

Learn more about OnchainID and Blockchain Identities on the official OnchainID website: [https://onchainid.com](https://onchainid.com).

## Usage

- Install contracts package to use in your repository `yarn add @onchain-id/solidity`
- Require desired contracts in-code (should you need to deploy them):
  ```javascript
  const { contracts: { ERC734, Identity } } = require('@onchain-id/solidity');
  ```
- Require desired interfaces in-code (should you need to interact with deployed contracts):
  ```javascript
  const { interfaces: { IERC734, IERC735 } } = require('@onchain-id/solidity');
  ```
- Access contract ABI `ERC734.abi` and ByteCode `ERC734.bytecode`.

## Development

- Install dev dependencies `npm ci`
- Update interfaces and contracts code.
- Run lint `npm run lint`
- Compile code `npm run compile`

### Testing

- Run `npm ci`
- Run `npm test`
  - Test will be executed against a local Hardhat network.

---

<div style="padding: 16px;">
   <a href="https://tokeny.com/wp-content/uploads/2023/04/Tokeny_ONCHAINID_SC-Audit_Report.pdf" target="_blank">
       <img src="https://hacken.io/wp-content/uploads/2023/02/ColorWBTypeSmartContractAuditBackFilled.png" alt="Proofed by Hacken - Smart contract audit" style="width: 258px; height: 100px;">
   </a>
</div>


# 1) Deploy claim issuer contract:
'''
npx hardhat run scripts/deploy-claim-issuer.ts --network localhost
'''
# 2) Deploy identity contract (deploy identity contract and add a key if you like to verify isClaimValid):
'''
npx hardhat deploy-identity --from 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 --key 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 --network localhost
'''

# 3) Add claim key in claim issuer contract:
'''
npx hardhat add-key --identity <claim-issuer-contractAddress> --from 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --key 0x90F79bf6EB2c4f870365E785982E1f101E93b906 --type 1 --purpose 3 --network localhost
'''

# 4) Create signature:

## Edit .\scripts\signature-verify.ts here:
 '''
 const signer = await ethers.getSigner('<address-of-claim-key>');
 '''
## Edit .\scripts\signature-verify.ts below:
  '''
const message = ethers.utils.arrayify(
        ethers.utils.keccak256(
            ethers.utils.defaultAbiCoder.encode(
                ['address', 'uint256', 'bytes'],
                ['<identity-contract-address>', 1876049749 , '0x8f3e8b45fa62fc6abf12d73c4feef3c54f0404bea83c85f1159df7de9f8f1944']
            )
        )
    );
  '''
'''
npx hardhat run .\scripts\signature-verify.ts --network localhost
'''


# 5) Add claim to identity contract:
'''
npx hardhat add-claim --identity <identity-contract-address> --from <address-of-key-added-to-claim-issuer> --claim '{\"topic\": \"1876049749\", \"scheme\": \"1\", \"issuer\": \"<claim-issuer-contract-address>\", \"data\": \"0x8f3e8b45fa62fc6abf12d73c4feef3c54f0404bea83c85f1159df7de9f8f1944\", \"signature\": \"<input signature here>\", \"uri\": \"https://ipfs.moralis.io:2053/ipfs/QmWTqnY1TvKgmaKCjjaQFNejwfoNJRrYkKt7iaj22SxJNL/hashedEmployeedetails.json\"}' --network localhost
'''