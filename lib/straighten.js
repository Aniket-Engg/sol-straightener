'use strict';

const { getPragma, processFile } = require('./../utils/file');

module.exports.straighten = async (filePath) => {
  const pragma = await getPragma(filePath);
  let contractSource = await processFile(filePath, false, true);
  contractSource = pragma + '\n\n' + contractSource;
  return contractSource;
};
