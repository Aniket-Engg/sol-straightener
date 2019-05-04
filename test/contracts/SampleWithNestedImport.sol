pragma solidity ^0.5.7;

import "./SampleWithImport.sol";

contract SampleWithNestedImport is SampleWithImport{

    function decrement(uint _n) public pure returns (uint) {
        return _n--;
    }
}