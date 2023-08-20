// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract Todo {
    struct Item {
        string text;
        bool completed;
    }

    event TodoCreated(uint256 indexed idx, string text);
    event TodoUpdated(uint256 indexed idx, string text);
    event TodoCompleted(uint256 indexed idx);

    mapping(address => Item[]) public items;

    function getCount(address _address) public view returns (uint256) {
        return items[_address].length;
    }

    function create(string memory _text) public {
        Item[] storage storedTasks = items[msg.sender];
        Item memory item = Item(_text, false);
        storedTasks.push(item);
        emit TodoCreated(items[msg.sender].length - 1, _text);
    }

    function update(uint256 _idx, string memory _text) itemExists(_idx) public {
        Item storage item = items[msg.sender][_idx];
        item.text = _text;
        emit TodoUpdated(_idx, _text);
    }

    function toggleCompleted(uint256 _idx) itemExists(_idx) public {
        Item storage item = items[msg.sender][_idx];
        item.completed = !item.completed;
        emit TodoCompleted(_idx);
    }

    modifier itemExists(uint256 _idx) {
        require(_idx < items[msg.sender].length, "Item does not exist");
        _;
    }
}
