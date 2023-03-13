// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNFT is ERC721 {
    uint256 private s_tokenId;
    string private s_tokenURI =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

    constructor() ERC721("BasicNFT", "BNFT") {
        s_tokenId = 0;
    }

    function tokenURI(
        uint256 /* tokenId*/
    ) public view override returns (string memory) {
        return s_tokenURI;
    }

    function mint() public returns (uint256) {
        _safeMint(msg.sender, s_tokenId);
        s_tokenId += 1;
        return s_tokenId;
    }
}
