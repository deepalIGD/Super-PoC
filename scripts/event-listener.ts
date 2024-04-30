const { ethers } = require("hardhat");
const hre = require("hardhat")

interface MyEvent {
    _recovered: string;
}

async function listenToEvent() {
  // Get the contract instance

  const signer = await ethers.getSigner('0x90F79bf6EB2c4f870365E785982E1f101E93b906');
  const contract = await hre.ethers.getContractAt('ClaimIssuer', '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e', signer);
  // Subscribe to the event
  contract.on("Test", (eventArgs: MyEvent) => {
    console.log("Event received:", eventArgs._recovered);
  });

  console.log("Listening for events...");

  // Keep the script running indefinitely
  await new Promise(() => {});
}

listenToEvent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
