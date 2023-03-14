// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";
error DifferNFT_invalidTokenId();

contract DifferNFT is ERC721 {
    uint256 private s_tokenId;
    string private s_LowPriceNFT;
    string private s_HighPriceNFT;
    string private baseURI = "data:image/svg+xml;base64,";
    // string private constant
    mapping(uint256 => uint256) private s_tokenIdToValue;

    constructor(
        string memory LowNFTSvg,
        string memory highNFTSvg
    ) ERC721("differNFT", "DNFT") {
        s_tokenId = 0;
        s_LowPriceNFT = svgToURI(LowNFTSvg);
        s_HighPriceNFT = svgToURI(highNFTSvg);
    }

    function svgToURI(string memory svg) internal view returns (string memory) {
        string memory svgToBytes = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );
        return string(abi.encodePacked(baseURI, svgToBytes));
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function Mint(uint256 value) public {
        s_tokenIdToValue[s_tokenId] = value;
        _safeMint(msg.sender, s_tokenId);
        s_tokenId = s_tokenId + 1;
    }

    // this function will encode the METADATA and Image of The Nft to TokenURI
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        if (!_exists(tokenId)) revert DifferNFT_invalidTokenId();
        uint256 price = 1;
        string memory NFT_Image = s_LowPriceNFT;

        if (s_tokenIdToValue[tokenId] >= price) {
            NFT_Image = s_HighPriceNFT;
        }
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                name(),
                                '","description":"Good NFTs","image":"',
                                NFT_Image,
                                '","attributes":[{"trait_type":"cuteness","value":100}]}'
                            )
                        )
                    )
                )
            );
    }

    // will give us the base64 string of our lowSVG
    function lowSVGTOURI() public view returns (string memory) {
        return s_LowPriceNFT;
    }

    function highSVGTOURI() public view returns (string memory) {
        return s_HighPriceNFT;
    }
}
