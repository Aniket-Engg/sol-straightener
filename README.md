[![Build status](https://travis-ci.com/Aniket-Engg/sol-straightener.svg?branch=master)](https://travis-ci.com/Aniket-Engg/sol-straightener)
[![Coverage Status](https://coveralls.io/repos/github/Aniket-Engg/sol-straightener/badge.svg?branch=master)](https://coveralls.io/github/Aniket-Engg/sol-straightener?branch=master)
[![devDependencies Status](https://david-dm.org/aniket-engg/sol-straightener/dev-status.svg)](https://david-dm.org/aniket-engg/sol-straightener?type=dev)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Aniket-Engg/sol-straightener)

# sol-straightener
sol-straightener is an NPM package to straighten the Solidity smart contracts. It fetches the content of all imported files and returns the straightened data. It works inside a file only. 

## Install
As a dependency, to use inside a file:
```
npm install --save sol-straightener
```

## How to use

```
    const Straightener = require('sol-straightener');
    let result = await Straightener.straighten(<solidity/file/path>);
```
A import straightened file contents will be returned which can be used for further processing or writing a file.

## Contribution
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Aniket-Engg/sol-straightener/issues)

Contribution in any form is most welcome.

## License
[MIT](https://github.com/Aniket-Engg/sol-straightener/blob/master/LICENSE)


