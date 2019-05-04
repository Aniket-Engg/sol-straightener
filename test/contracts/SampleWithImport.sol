pragma solidity ^0.5.7;

import "./Sample.sol";

contract SampleWithImport is Sample{

    function increment(uint _n) public pure returns (uint) {
        return _n++;
    }
}