[![npm version](https://badge.fury.io/js/sol-straightener.svg)](https://www.npmjs.com/package/sol-straightener)
[![Build status](https://travis-ci.com/Aniket-Engg/sol-straightener.svg?branch=master)](https://travis-ci.com/Aniket-Engg/sol-straightener)
[![Coverage Status](https://coveralls.io/repos/github/Aniket-Engg/sol-straightener/badge.svg?branch=master)](https://coveralls.io/github/Aniket-Engg/sol-straightener?branch=master)
[![dependencies Status](https://david-dm.org/aniket-engg/sol-straightener/status.svg)](https://david-dm.org/aniket-engg/sol-straightener)
[![devDependencies Status](https://david-dm.org/aniket-engg/sol-straightener/dev-status.svg)](https://david-dm.org/aniket-engg/sol-straightener?type=dev)
[![npm](https://img.shields.io/npm/dt/sol-straightener.svg)](https://www.npmjs.com/package/sol-straightener)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Aniket-Engg/sol-straightener)

# sol-straightener
sol-straightener is an NPM package to straighten the Solidity smart contracts for various purposes. It fetches the content of each imported file and returns the straightened version. It works inside a file. 

## Install
```
npm install --save sol-straightener
```
## How to use
```
    const Straightener = require('sol-straightener');
    let result = await Straightener.straighten(<solidity/file/path>);
```
An import straightened file contents will be returned which can be used for further processing or writing a file.

## Support
Currently it handles `import` of files from:
* relative directories, e.g; `import "./lib/SafeMath.sol";`
* All parent `node_modules` directories, e.g; `import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";`
* Github, e.g; `import "github.com/oraclize/ethereum-api/oraclizeAPI_0.5.sol";`

## Contribution
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Aniket-Engg/sol-straightener/issues)

Contribution in any form is most welcome.

## License
[MIT](https://github.com/Aniket-Engg/sol-straightener/blob/master/LICENSE)


