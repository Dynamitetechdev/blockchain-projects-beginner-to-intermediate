// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

abstract contract Context {
    function Owner() internal view virtual returns (address) {
        return msg.sender;
    }
}
