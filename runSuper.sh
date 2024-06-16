#!/bin/bash
echo "Starting script"
rm output.txt
sleep 2
echo "========================================Deploying claim issuer identity contract for employer (ERC734/735)=================="
npx hardhat run scripts/deploy-claim-issuer.ts --network localhost
sleep 2
echo "=======================================Deploy ADC tokens and mint tokens to employer"
npx hardhat run scripts/deploy-token.ts --network localhost
sleep 2
# Read the contents of the file into a variable
file="output.txt"
second_column=$(awk -F':' 'NR==1 {print $2}' "$file")
# Strip leading and trailing whitespace using awk
claimIssuer=$(echo "$second_column" | awk '{$1=$1};1')
echo "========================================Adding Fund Admin Key to grant permission to add employee claims =================="

echo "Please enter wallet address adding the key (should be an admin key):"
read -r adminKey

# Use the default value if no input is provided
adminKey=${adminKey:-0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266}

echo "Please enter claim key/Fund Admin address (this address can add claims later on):"
read -r claimKey
# Use the default value if no input is provided
claimKey=${claimKey:-0x90F79bf6EB2c4f870365E785982E1f101E93b906}

# Define the file path
file="output.txt"
# Write the variable value to a new line in the file
echo "Claim Key: $claimKey" >> "$file"
echo "Adding claim/FA key.... $claimIssuer, $adminKey and $claimKey"
sleep 2
npx hardhat add-key --identity $claimIssuer --from $adminKey --key $claimKey --type 1 --purpose 3 --network localhost
sleep 2
echo "=================== Fund Admin uploading hashed employee details from data.json to IPFS=============================="
npx ts-node uploadIPFS.ts
sleep 2
echo "========================Derive claim signature to later incorporate into the claim================================================"
npx hardhat run scripts/derive-signature.ts --network localhost
sleep 2
echo "===============================Fund Admin adding claim of employee details========================================================"

#read IPFS hash and signature and parse to the command

# Define the file path
file="output.txt"

# Read the contents of the file
while IFS= read -r line || [[ -n "$line" ]]; do
    # Extract the value from the second column
    value=$(echo "$line" | cut -d':' -f2- | awk '{$1=$1};1')

    # Store the values in variables based on the line number
    case $line in
        *"Claim Signature"*)
            signature=$value ;;
        *"IPFS hash"*)
            IPFSHash=$value ;;
        *"IPFS path"*)
            IPFSPath=$value ;;
    esac
done < "$file"
npx hardhat add-claim --identity $claimIssuer --from $claimKey --claim "{\"topic\": \"1876049749\", \"scheme\": \"1\", \"issuer\": \"$claimIssuer\", \"data\": \"$IPFSHash\", \"signature\": \"$signature\", \"uri\": \"$IPFSPath\"}" --network localhost
sleep 2
echo "========================================Making Super Payment if Claim is valid==============================="
#ToDo - get claim, extract the IPFS URI -> fetch IPFS hash -> compare with local hash -> if equal trigger a payment tx
npx hardhat run scripts/fetch-Claim.ts --network localhost