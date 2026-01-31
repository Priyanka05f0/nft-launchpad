// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyNFT is ERC721, Ownable {
    using Strings for uint256;

    uint256 public tokenCounter;
    string private baseTokenURI;

    constructor(string memory _baseTokenURI)
        ERC721("MyNFT", "MNFT")
        Ownable(msg.sender)
    {
        require(bytes(_baseTokenURI).length > 0, "Base URI empty");
        baseTokenURI = _baseTokenURI;
        tokenCounter = 0;
    }

    function mint() external {
        uint256 tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);
        tokenCounter++;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(tokenId < tokenCounter, "Token does not exist");
        return string(
            abi.encodePacked(baseTokenURI, tokenId.toString(), ".json")
        );
    }
}
