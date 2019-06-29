'use strict';

const Straightener = require('../'),
  expect = require('chai').expect,
  fs = require('fs');

describe('sol-straightener', () => {

  it('Contract with single import', async () => {
    const strtnFile = await Straightener.straighten(__dirname + '/contracts/SampleWithImport.sol');
    const strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/SampleWithImport.sol');
    expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
  });

  it('Fails for contract with non existing file import', async () => {
    try {
      await Straightener.straighten(__dirname + '/contracts/SampleWithImportNotExisting.sol');
    } catch (error) {
      expect(error.message).to.include('no such file or directory');
    }
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

  it('Contract with imports from parent node_modules', async () => {
    const strtnFile = await Straightener.straighten(__dirname + '/contracts/ImportFromParentNodeModules.sol');
    const strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/ImportFromParentNodeModules.sol');
    expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
  });

  it('Contract with multiple imports from Github', async () => {
    const strtnFile = await Straightener.straighten(__dirname + '/contracts/MultiImportFromGithub.sol');
    const strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/MultiImportFromGithub.sol');
    expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
  });

  it('Contract with nested imports from Github', async () => {
    const strtnFile = await Straightener.straighten(__dirname + '/contracts/NestedImportFromGithub.sol');
    const strtnContent = fs.readFileSync(__dirname + '/contracts/straightened/NestedImportFromGithub.sol');
    expect(Buffer.from(strtnFile)).to.deep.equal(strtnContent);
  });
});
