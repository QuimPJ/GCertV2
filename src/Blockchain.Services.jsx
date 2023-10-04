import Web3 from 'web3'
import { setGlobalState, getGlobalState, setAlert } from './store/indexStore'
//import abi from './abis/TimelessNFT.json'
import abi from './abis/NFTMarketplace.json'
import abiNft from './abis/MyNFT.json'
import ethers from 'ethers'

const addressNFT = "0xb4a2a4652E4922895FF828396e7eC078CEEa6C4D"
const addressMP = "0xd3449D565bd023F37149527e252AE2A64577F976"


const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)

const getEtheriumContract = async () => {
  const account = getGlobalState('connectedAccount')

  if (account) {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const networkData = abi.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(abi.abi, networkData.address)

      return contract
    } else {
      return null
    }
  } else {
    return getGlobalState('contract')
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    reportError(error)
  }
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0])
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) { 
    reportError(error)
  }
} 

const structuredCollections = (collections) => {
  return collections
    .map((collection) => ({
      owner: collection.owner.toLowerCase(),
      idCollection  : collection.idCollection,
      name: collection.name,
      collectionURI: collection.collectionURI,
      description  : collection.description,
      nftContracts  : collection.nftContracts,
      nNft  : collection.nNft,
    }))
    .reverse()
}

const structuredNfts = (nfts) => {
  return nfts
    .map((nft) => ({
      name: nft.name,
      description: nft.description,
      additionalInfo: nft.additionalInfo,
      tokenURI: nft.tokenURI,
      tokenId: nft.tokenId,
      owner: nft.owner,
      price: nft.price,
    }))
    .reverse()
}

const structuredTransaction = (trans) => {
  return trans
    .map((returnValues) => ({
      id: returnValues[0],
      collid: returnValues[1],
      price: returnValues[2],
      buyer: returnValues[3],
     
    }))
    .reverse()
}


const getCollectionBC = async (idCollection) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = await getEtheriumContract()
    console.log("idCollection");
    console.log(idCollection);
    const nNfts = await contract.methods.getnNFT(idCollection).call()
    setGlobalState('nNfts', (nNfts))
    console.log("nNfts");
    console.log(nNfts);
  } catch (error) {
    reportError(error)
  }
}



const getAllCollectionsAndNFts = async () => {
  console.log("getAllCollectionsAndNFts");

  try {
    if (!ethereum) return alert('Please install Metamask')
    let collections    
    const contract = await getEtheriumContract()
    const transactionsBis = 0;
    const _owner = await contract.methods.mpOwner().call()
    const _artist = await contract.methods.artist().call()
    const collectionCounter = await contract.methods.collectionCounter().call()

    if(collectionCounter>0){

        const collection = await contract.methods.getAllCollections().call()

        setGlobalState('collections', (collection))

    
    }
    setGlobalState('owner', _owner)
   

  } catch (error) {
    reportError(error)
  }
}

const getAllCollections = async () => {
  console.log("getAllCollections");

  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
    const transactionsBis = 0;
    const _owner = await contract.methods.mpOwner().call()
    const _artist = await contract.methods.artist().call()
    const collectionCounter = await contract.methods.collectionCounter().call()
 
    if(collectionCounter>0){

        let collections 

        for (let i = 0; i < collectionCounter;i++){
          const collection = await contract.methods.collections(0).call()
          collections[0] = collection
        }
        setGlobalState('collections', collections)
        setGlobalState('owner', _owner)
    
    }


    const test = await contract.getPastEvents('NFTSold', {
      fromBlock: 0,
      toBlock: 'latest'
    });
   


    //setGlobalState('collections', structuredCollections(collections))

    setGlobalState('owner', (_owner))
    setGlobalState('artist', (_artist))
    //setGlobalState('transactions', (test))

  } catch (error) {
    reportError(error)
  }
}



const unListNFT = async ({idCollection,tokenId}) => {
  const account = getGlobalState('connectedAccount')

  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract( addressMP, abi.abi, signer)
    const account = getGlobalState('connectedAccount')

    const result = await contract.unListNFT(idCollection, tokenId, addressNFT);


  } catch (error) {
    reportError(error)
  }
}

//collectionId, uint256 tokenId, uint256 price
const listNFT = async ({idCollection,tokenId, cost, nftContracts}) => {
  const account = getGlobalState('connectedAccount')

  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract( addressMP, abi.abi, signer)

    
    const contract2 = new ethers.Contract( addressNFT, abiNft.abi, signer)
 

    const result3 = await contract2.approve(addressMP, tokenId);

    const account = getGlobalState('connectedAccount')
    const costList = window.web3.utils.toWei(cost.toString(), 'ether')

    console.log(account)
    console.log(costList)
    console.log(tokenId)
    console.log(idCollection)

    //const result2 = await contract.approveNft(idCollection, tokenId);
   
    const result = await contract.listNFT(idCollection, tokenId, costList, addressNFT);


  } catch (error) {
    reportError(error)
  }
}

const getAllNFTs = async (idCollection) => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
    const result = await contract.methods.getNFTCollection(idCollection).call()
    const {0: nNfts, 1: list} = result;

    console.log("nNfts"); // "data"
    console.log("nNfts"); // "data"
    console.log("nNfts"); // "data"
    console.log("nNfts"); // "data"
    console.log(nNfts); // "data"
    console.log(list); // true

    setGlobalState('nfts', (nNfts))
    setGlobalState('list', (list))

  } catch (error) {
    reportError(error)
  }
}


const CreateCollection = async ({ collectionTitle, collectionDescription, metadataURI, isCert, maxNfts }) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract(addressMP, abi.abi, signer)
    const account = getGlobalState('connectedAccount')
    console.log(account)
    // Envía la transacción con la cantidad de gas estimada
    const data1 = 1
    const data2 = 2
    //function createCollection(string memory name, string memory description, string memory collectionURI, uint8 isCert, uint256 maxNfts) public  {
    const result = await contract.createCollection(collectionTitle.toString(), collectionDescription.toString(), metadataURI.toString(), isCert, maxNfts);
    console.log("result")
    console.log(result)

    return result;
  } catch (error) {
    reportError(error);
  }
}


const mintNFT = async (collectionId,{ collectionTitle, collectionDescription, maxInvestors, metadataURI, maxInvest, maxDrop, leverage, assets}) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract(addressMP, abi.abi, signer)
    const account = getGlobalState('connectedAccount')


    console.log(collectionId)
    console.log(collectionTitle)
    console.log(collectionDescription)
    console.log(maxInvestors)
    console.log(metadataURI)
    console.log(maxDrop)
    console.log(assets)


    const result = await contract.mintNFT(collectionId.toString(), metadataURI, collectionTitle,collectionDescription, maxInvestors, maxDrop , assets,addressNFT);

    return result
  } catch (error) {
    reportError(error)
  }
}

const buyNFTBL = async ({collectionId ,id, cost }) => {
  
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract( addressMP, abi.abi, signer)
    const account = getGlobalState('connectedAccount')

    const result = await contract.buyNFT(collectionId, id, { value: cost});


  } catch (error) {
    reportError(error)
  }
}

const updateNFT = async ({ id, cost }) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), 'ether')
    const contract = await getEtheriumContract()
    const buyer = getGlobalState('connectedAccount')

    await contract.methods.changePrice(Number(id), cost).send({ from: buyer })
  } catch (error) {
    reportError(error)
  }
}

const reportError = (error) => {
  setAlert(JSON.stringify(error), 'red')
  throw new Error('No ethereum object.')
}

export {
  getAllNFTs,
  CreateCollection,
  connectWallet,
  getAllCollections,
  mintNFT,
  buyNFTBL,
  unListNFT,
  updateNFT,
  listNFT,
  getCollectionBC,
  isWallectConnected,
  getAllCollectionsAndNFts,
}
