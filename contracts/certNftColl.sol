// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CertNftColl is ERC721URIStorage {
    uint public tokenCount;
    uint public maxItems;
    
    constructor(string memory _name, string memory _abre, uint256 _maxItems) ERC721(_name, _abre){
        maxItems = _maxItems;
    }
    

    function mint(address sender, string memory _tokenURI) external returns(uint) {

        tokenCount ++;
        require(maxItems <= tokenCount, "Items limit");
        _safeMint(sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return(tokenCount);
    }


    
}