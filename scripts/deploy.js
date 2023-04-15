const hre = require("hardhat");
const fs = require('fs');

async function main() {

  const UserData = await hre.ethers.getContractFactory("UserData");
  const dataItem = await UserData.deploy();
  await dataItem.deployed();
  console.log("contract deployed to:", dataItem.address);

  fs.writeFileSync('./config.js', `
  export const dataChainAddress = "${dataItem.address}"
  `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});