pragma solidity ^0.5.7;

import "github.com/Aniket-Engg/sol-straightener/test/contracts/SampleWithMultiImport.sol";

contract MultiImportFromGithub {
    uint public  n;

    function set(uint _n) public returns (uint) {
        n = _n;
    }

    function get() public view  returns (uint) {
        return n;
    }
}