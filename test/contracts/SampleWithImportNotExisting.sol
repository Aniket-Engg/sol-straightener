pragma solidity ^0.5.7;

import "./Sample3.sol";

contract SampleWithImportNotExisting is Sample3{

    function increment(uint _n) public pure returns (uint) {
        return _n++;
    }
}