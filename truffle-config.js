// require('babel-register')
// require('babel-polyfill')

module.exports = {
  // Configure networks (Localhost, Rinkeby, etc.)
  networks: {
    development: {
      host: '127.0.0.1',
      gas: 5500000,
      port: 7545,
      network_id: '*', // Match any network id
    },
    /*goerli: {
      provider: () =>
        new HDWalletProvider(process.env.SECRET_KEY, process.env.ENDPOINT_URL),
      network_id: 5,
      gas: 5500000,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    */
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './src/abis/',
  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.1',
      optimizer: {
        enabled: true,
        runs: 200
      }
      
    },
  },    
}