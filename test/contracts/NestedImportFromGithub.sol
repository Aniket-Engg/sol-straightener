pragma solidity ^0.5.7;

import "github.com/Aniket-Engg/sol-straightener/test/contracts/SampleWithNestedImport.sol";

contract NestedImportFromGithub {
    uint public  n;

    function set(uint _n) public returns (uint) {
        n = _n;
    }

    function get() public view  returns (uint) {
        return n;
    }
}