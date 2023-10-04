// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.1;


/// @title ERC721 with permit
/// @notice Extension to ERC721 that includes a permit function for signature based approvals
interface IMarketPlace {
    
    struct NFT {
        string name;
        string description;
        string additionalInfo;
        string tokenURI;
        uint256 tokenId;
        address payable owner;
        uint256 price;

    }

    struct IndexingCollections {
        address owner; // Dueño de la colección
        uint256 idCollection; // Dueño de la colección
        string name; // Nombre de la colección
        string collectionURI;
        string description;
        address nftContracts;
        uint256 nNft;
    }

    // Estructura para representar una colección
    struct Collection {
        address payable owner; // Dueño de la colección
        string name; // Nombre de la colección
        string collectionURI;
        uint256 nNfts;
        uint256 nIndex;
        string description;
        mapping(uint256 => address) nftContracts; // Mapping de contratos de NFT por tokenId
        mapping(uint256 => bool) nftsForSale; // Mapping de NFTs a la venta por tokenId
        mapping(uint256 => NFT) nfts; // Mapping de NFTs con información adicional
    }

}