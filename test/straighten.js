const Straightener = require('../'),
    expect  = require('chai').expect;
    fs = require('fs');

describe('sol-straightener', () => {

    it('Contract with single import', async () => {
        let strtnFile = await Straightener.straighten(__dirname + '/contracts/SampleWithImport.sol');
        let strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/SampleWithImport.sol'); 
        expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
    });

    it('Contract with nested imports', async () => {
        let strtnFile = await Straightener.straighten(__dirname + '/contracts/SampleWithNestedImport.sol');
        let strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/SampleWithNestedImport.sol'); 
        expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
    });

    it('Contract with multiple imports', async () => {
        let strtnFile = await Straightener.straighten(__dirname + '/contracts/SampleWithMultiImport.sol');
        let strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/SampleWithMultiImport.sol'); 
        expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
    });

    it('Contract with imports from node_modules', async () => {
        let strtnFile = await Straightener.straighten(__dirname + '/contracts/ImportFromNodeModules.sol');
        let strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/ImportFromNodeModules.sol'); 
        expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
    });
});