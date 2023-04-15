// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

contract UserData {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct DataItem {
        uint256 tokenId;
        address owner;
        address uploader;
        string dataHash;
        string fileHash;
        string name;
    }

    address payable owner;
    DataItem[] items;

    constructor() {
        owner = payable(msg.sender);
    }
    

    function createToken(
        string memory dataHash,
        string memory fileHash,
        string memory name
    ) public payable {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        require(msg.value > 0, "amount must be > 0");
        owner.transfer(msg.value);
        items.push(DataItem(newTokenId, owner, msg.sender, dataHash, fileHash, name));
    }
}
