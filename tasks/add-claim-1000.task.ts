import {task} from "hardhat/config";
import {TaskArguments} from "hardhat/types";

task("add-claim-1000", "Add a claim to an identity")
  .addParam("identity", "The address of the identity")
  .addParam("from", "A CLAIM key on the claim issuer")
  .addParam("claim", "The content of a claim as a JSON string")
  .setAction(async (args: TaskArguments, hre) => {
    const signer = await hre.ethers.getSigner(args.from);

    const identity = await hre.ethers.getContractAt('Identity', args.identity, signer);

    const claim = JSON.parse(args.claim);

    console.log(claim);

    for(var i=1829; i < 10000; i++){
      //var topic = parseInt(claim.topic, 10);
      //claim.topic = claim.topic + 1  
      var claimTopic = i.toString()
      const tx = await identity.addClaim(
        claimTopic,
        claim.scheme,
        claim.issuer,
        claim.signature,
        claim.data,
        claim.uri,
      );

      //console.log(`Add claim of topic ${claim.topic} on identity ${args.identity} tx: ${tx.hash}`);

      await tx.wait();
      console.log(`Add claim of topic ${claimTopic} on identity ${args.identity} tx mined: ${tx.hash} and mined count: ${i}`);
    }
  });
