/* eslint-disable no-undef */
const NFTMarketplace = artifacts.require('NFTMarketplace')
const NFTContract = artifacts.require('myNFT')
const Order = artifacts.require('Order')
const OrderStore = artifacts.require('OrderStore')
const FoundStore = artifacts.require('FoundStore')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  const resultNFT = await deployer.deploy(NFTContract)
  const foundStore = await deployer.deploy(FoundStore)
  const result = await deployer.deploy(NFTMarketplace, resultNFT.address)
  const orderStore = await deployer.deploy(OrderStore)
  const order = await deployer.deploy(Order, orderStore.address, foundStore.address)

  console.log("result")
  console.log("resultNFT.address")
  console.log(resultNFT.address)
  console.log("result.address")
  console.log(result.address)
  console.log("Orders.address")
  console.log(order.address)
  console.log("ordersStore.address")
  console.log(orderStore.address)
  console.log("FoundStore.address")
  console.log(foundStore.address)
}
