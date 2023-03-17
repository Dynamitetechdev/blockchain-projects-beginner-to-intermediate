// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error RandomNFT_notEnough();
error RandomNFT_outOfBounds();

contract RandomNFT is ERC721URIStorage, VRFConsumerBaseV2, Ownable {
    enum NFTS {
        Basic,
        Standard,
        Unique
    }
    uint256 private s_tokenId;
    uint256 private constant MAX_VALUE = 100;
    uint256 private constant MINT_FEE = 1 ether;
    VRFCoordinatorV2Interface immutable i_VFRcoordinator;
    uint256 private i_requestId;

    //NFT_URI Array
    string[] private NFT_URI;
    //VRF Request
    bytes32 private immutable i_keyHash;
    uint64 private immutable i_subId;
    uint16 private constant REQUEST_CONFIRMATIONS = 1;
    uint32 private immutable i_callbackGasLimit;
    uint32 private constant NUMWORDS = 3;

    //mappings
    mapping(uint256 => address) private requestIdToOwner;

    //events
    event MINTRequested(
        uint256 indexed requestId,
        address indexed mintRequester
    );
    event NFT_Request_Fulfiled(
        uint256 indexed s_tokenId,
        address indexed requesterAddress,
        uint256 indexed requestId
    );

    constructor(
        address _vrfCoordinator,
        bytes32 keyHash,
        uint64 subId,
        uint32 callbackGasLimit,
        string[3] memory _NFT_URI
    ) VRFConsumerBaseV2(_vrfCoordinator) ERC721("$RandomNFT", "$RNFT") {
        i_VFRcoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
        s_tokenId = 0;
        i_keyHash = keyHash;
        i_subId = subId;
        i_callbackGasLimit = callbackGasLimit;
        NFT_URI = _NFT_URI;
    }

    function Mint(uint256 mintFee) public payable {
        if (msg.value < mintFee) revert RandomNFT_notEnough();
        i_requestId = i_VFRcoordinator.requestRandomWords(
            i_keyHash,
            i_subId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUMWORDS
        );
        requestIdToOwner[i_requestId] = msg.sender;

        emit MINTRequested(i_requestId, msg.sender);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        address requesterAddress = requestIdToOwner[requestId];
        uint256 moddedRandomWord = randomWords[0] % MAX_VALUE;
        NFTS fulfillledNFT = getProbability(moddedRandomWord);
        _safeMint(requesterAddress, s_tokenId);
        _setTokenURI(s_tokenId, NFT_URI[uint256(fulfillledNFT)]);
        s_tokenId += 1;

        emit NFT_Request_Fulfiled(s_tokenId, requesterAddress, requestId);
    }

    function getProbability(uint256 moddedValue) public pure returns (NFTS) {
        uint256[3] memory _probabilityArr = probabilityArr();
        uint256 cummulativeSum = 0;

        for (uint index = 0; index < _probabilityArr.length; index++) {
            if (
                moddedValue >= cummulativeSum &&
                moddedValue < cummulativeSum + _probabilityArr[index]
            ) {
                return NFTS(index);
            }

            cummulativeSum += _probabilityArr[index];
        }

        revert RandomNFT_outOfBounds();
    }

    function probabilityArr() public pure returns (uint256[3] memory) {
        return [10, 30, MAX_VALUE];
    }

    function tokenURI() public pure returns (string memory) {
        return "your nft";
    }
}
