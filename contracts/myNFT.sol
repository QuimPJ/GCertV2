// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721URIStorage {
    uint public tokenCount;
    
    constructor() ERC721("GAUDI COLLECTIONS", "GC"){}

    function mint(address sender, string memory _tokenURI) external returns(uint) {
        tokenCount ++;
        _safeMint(sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return(tokenCount);
    }


}