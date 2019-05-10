pragma solidity ^0.5.7;

contract Sample {
    uint public  n;

    function set(uint _n) public returns (uint) {
        n = _n;
    }

    function get() public view  returns (uint) {
        return n;
    }
}

contract Sample2 {

    function double(uint _n) public pure returns (uint) {
        return 2*_n;
    }

}

contract SampleWithMultiImport is Sample, Sample2{

    function half(uint _n) public pure returns (uint) {
        return _n/2;
    }
}

contract MultiImportFromGithub {
    uint public  n;

    function set(uint _n) public returns (uint) {
        n = _n;
    }

    function get() public view  returns (uint) {
        return n;
    }
}