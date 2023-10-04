// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Importar contratos necesarios
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./myNFT.sol";

contract NFTMarketplace is Ownable, ReentrancyGuard {
    address public artist; // Dirección del artista
    address public mpOwner; // Dirección del propietario del marketplace
    uint8   public royalityFee = 0; // Porcentaje de regalía del artista
    uint256 public collectionCounter = 0; // Porcentaje de regalía del artista

    // Estructura para representar un NFT
    struct NFT {
        string      name;
        string      description;
        string      tokenURI;
        uint256     tokenId;
        address     payable owner;
        uint256     investedMoney;
        uint256     minInvesting;
        uint256     maxDropDown;
        uint256     leverage;
        string     assets;
        uint256     maxInvestors;
        uint256     investors;
        address     nftContracts;

    }

    struct IndexingCollections {
        address     owner; // Dueño de la colección
        uint256     idCollection; // Dueño de la colección
        string      name; // Nombre de la colección
        string      collectionURI;
        string      description;
        uint256     nNft;
        uint256     maxNfts;
        uint8       isCert;
    }

    // Estructura para representar una colección
    struct Collection {
        address payable             owner; // Dueño de la colección
        string                      name; // Nombre de la colección
        string                      collectionURI;
        uint256                     nNfts;
        uint256                     nIndex;
        uint8                       isCert;
        uint256                     maxNfts;
        string                      description;
        uint256                     idCollection;
        mapping(uint256 => bool)    nftsForSale; // Mapping de NFTs a la venta por tokenId
        mapping(uint256 => NFT)     nfts; // Mapping de NFTs con información adicional
        mapping(uint256 => uint256) nftList; // Mapping de NFTs con información adicional
    }

    // Mapping de colecciones
    mapping(uint256 => Collection) public collections;
    mapping(address => bool) private isContractAllow;
    
    //IndexingCollections[] private indexingCollections;

    // Eventos
    event CollectionCreated(uint256 indexed collectionId, string indexed collectionAddress);
    event NFTListed(uint256 indexed collectionId, uint256 indexed tokenId, uint256 price);
    event NFTUnlisted(uint256 indexed collectionId, uint256 indexed tokenId);
    event NFTSold(uint256 indexed collectionId, uint256 indexed tokenId, address buyer, uint256 price);

    // Constructor
    constructor(
        address _addressNft
    ) {
        isContractAllow[_addressNft]=true;
        collectionCounter = 0;
        royalityFee = 0;
        artist = msg.sender;
        mpOwner = msg.sender;
    }

    function createCollection(string memory name, string memory description, string memory collectionURI, uint8 isCert, uint256 maxNfts) public  {
                
        require(msg.sender == mpOwner || msg.sender == artist, "You must be the owner or an artist");

        // Crear un nuevo contrato ERC721
        //////
        Collection storage newCollection = collections[collectionCounter];
        newCollection.owner = payable(msg.sender);
        newCollection.description = description;
        newCollection.name = name;
        newCollection.nIndex = 0;//sindexingCollections.length;
        newCollection.maxNfts = maxNfts;//sindexingCollections.length;
        newCollection.isCert = isCert;//sindexingCollections.length;
        newCollection.collectionURI = collectionURI;
        newCollection.idCollection = collectionCounter;
        collectionCounter++;
        // Registrar la colección en el mapeo de colecciones del propietario
        emit CollectionCreated(collectionCounter, name);
    }
        // Función para crear un nuevo NFT en una colección
    function mintNFT(
        uint64 collectionId,
        string memory tokenURI,
        string memory name,
        string memory description,
        uint64  minInvesting,
        uint64  maxDropDown,
        string memory assets,
        address contractNft
    ) public  {

        require(msg.sender == collections[collectionId].owner, "You must be the owner");
        require(isContractAllow[contractNft], "SC not allowed");
        require(collections[collectionId].nNfts <= collections[collectionId].maxNfts, "Limit NFTs");

        MyNFT existingCollection = MyNFT(address(contractNft));

        
        uint256 tokenId=existingCollection.mint(msg.sender, tokenURI);
        collections[collectionId].nftList[collections[collectionId].nNfts] = tokenId;

        collections[collectionId].nNfts = collections[collectionId].nNfts+1;
        collections[collectionId].nftsForSale[tokenId] = false;

        collections[collectionId].nfts[tokenId] = NFT(name, description, tokenURI, tokenId, payable(msg.sender),0,minInvesting,maxDropDown,1,assets,20,0,contractNft);
        
    }
    
    
    // Función para listar un NFT en venta en una colección
    function listNFT(uint256 collectionId, uint256 tokenId, uint256 price, address contractNft) public {
       /* require(isContractAllow[contractNft], "SC not allowed");
        MyNFT existingCollection = MyNFT(address(contractNft));
        require(msg.sender == existingCollection.ownerOf(tokenId), "You must be the owner");

        collections[collectionId].nftsForSale[tokenId] = true;
        collections[collectionId].nfts[tokenId].price = price;  
        collections[collectionId].nfts[tokenId].owner = payable(existingCollection.ownerOf(tokenId));

        emit NFTListed(collectionId, tokenId, price);
    */
    }

    // Función para quitar un NFT de la venta en una colección
    function unListNFT(uint256 collectionId, uint256 tokenId, address contractNfts) public {
        /*
        require(isContractAllow[contractNfts], "SC not allowed");
        MyNFT existingCollection = MyNFT(address(contractNfts));
        require(msg.sender == existingCollection.ownerOf(tokenId), "You must be the owner");
        require(collections[collectionId].nftsForSale[tokenId] == true, "NFT is not listed");

        collections[collectionId].nftsForSale[tokenId] = false;

        emit NFTUnlisted(collectionId, tokenId);
        */
    }

    // Función para comprar un NFT de una colección
    function buyNFT(uint256 collectionId, uint256 tokenId) public payable {
/*
        require(collections[collectionId].nftsForSale[tokenId] == true, "NFT is not listed");
        uint256 price = collections[collectionId].nfts[tokenId].price;
        require(msg.value >= price, "Insufficient payment");

        MyNFT existingCollection = MyNFT(collections[collectionId].nfts[tokenId].nftContracts);

        address payable seller = payable(existingCollection.ownerOf(tokenId));

        collections[collectionId].nftsForSale[tokenId] = false;
        emit NFTSold(collectionId, tokenId, msg.sender, price);

        seller.transfer(price);
        existingCollection.transferFrom(seller, msg.sender, tokenId);

        collections[collectionId].nfts[tokenId].owner = payable(existingCollection.ownerOf(tokenId));
*/

    }
    

    // Per ara ho fem aixi. Retorne totes les colecions que tenim en el MP. Tenim en compte que nomes podran crear coleccions el owner o artistes.
    // Per ara nomes le owner.
    
    function getAllCollections() public view returns (IndexingCollections[] memory) {

        IndexingCollections[] memory _collections = new IndexingCollections[](collectionCounter);

        for (uint256 i = 0; i < collectionCounter; i++) {
            _collections[i] = IndexingCollections(
                collections[i].owner,
                collections[i].idCollection,
                collections[i].name,
                collections[i].collectionURI,
                collections[i].description,
                collections[i].nNfts,
                collections[i].maxNfts,
                collections[i].isCert
            );
        }
        return _collections;
    }

       
   
       
    function getNFTCollection (uint256 collectionId) public view returns (NFT[] memory, bool[] memory) {

        uint256 nftCount = collections[collectionId].nNfts;
        NFT[] memory nfts = new NFT[](nftCount);
        bool[] memory forSale = new bool[](nftCount);

        for (uint256 i = 1; i <= nftCount; i++) {   
            nfts[i-1] = NFT(
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].name,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].description,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].tokenURI,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].tokenId,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].owner,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].investedMoney,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].minInvesting,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].maxDropDown,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].leverage,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].assets,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].maxInvestors,
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].investors,                
                collections[collectionId].nfts[collections[collectionId].nftList[i-1]].nftContracts
            );
            forSale[i-1] = bool(collections[collectionId].nftsForSale[collections[collectionId].nftList[i-1]]);
        }

       
        return (nfts, forSale);
    }
   
}
