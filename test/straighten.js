'use strict';

const Straightener = require('../'),
  expect  = require('chai').expect,
  fs = require('fs');

describe('sol-straightener', () => {

  it('Contract with single import', async () => {
    const strtnFile = await Straightener.straighten(__dirname + '/contracts/SampleWithImport.sol');
    const strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/SampleWithImport.sol');
    expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
  });

  it('Contract with nested imports', async () => {
    const strtnFile = await Straightener.straighten(__dirname + '/contracts/SampleWithNestedImport.sol');
    const strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/SampleWithNestedImport.sol');
    expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
  });

  it('Contract with multiple imports', async () => {
    const strtnFile = await Straightener.straighten(__dirname + '/contracts/SampleWithMultiImport.sol');
    const strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/SampleWithMultiImport.sol');
    expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
  });

  it('Contract with imports from node_modules', async () => {
    const strtnFile = await Straightener.straighten(__dirname + '/contracts/ImportFromNodeModules.sol');
    const strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/ImportFromNodeModules.sol');
    expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
  });
});
