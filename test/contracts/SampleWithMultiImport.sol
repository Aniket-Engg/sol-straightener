pragma solidity ^0.5.7;

import "./Sample.sol";
import "./Sample2.sol";

contract SampleWithMultiImport is Sample, Sample2{

    function half(uint _n) public pure returns (uint) {
        return _n/2;
    }
}