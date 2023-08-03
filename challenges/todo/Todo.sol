pragma solidity ^0.8.21;

// SPDX-License-Identifier: UNLICENSED
contract Todo {
    struct Item {
        string text;
        bool completed;
    }

    event TodoCreated(uint256 indexed idx, string text);
    event TodoUpdated(uint256 indexed idx, string text);
    event TodoCompleted(uint256 indexed idx);

    Item[] public items;

    function getCount() public view returns (uint256) {
        return items.length;
    }

    function create(string memory _text) public {
        items.push(Item({
            text: _text,
            completed: false
        }));
        emit TodoCreated(items.length - 1, _text);
    }

    function update(uint256 _idx, string memory _text) itemExists(_idx) public {
        Item storage item = items[_idx];
        item.text = _text;
        emit TodoUpdated(_idx, _text);
    }

    function toggleCompleted(uint256 _idx) itemExists(_idx) public {
        Item storage item = items[_idx];
        item.completed = !item.completed;
        emit TodoCompleted(_idx);
    }

    modifier itemExists(uint256 _idx) {
        require(_idx < items.length, "Item does not exist");
        _;
    }
}
