'use strict';

const path = require('path'),
  { execSync } = require('child_process'),
  axios = require('axios'),
  fs = require('fs');

const regEx = {
  pragma  :   /(pragma solidity (.+?);)/g,
  import  :   /import ['"](.+?)['"];/g,
  github  :   /^(https?:\/\/)?(www.)?github.com\/([^/]*\/[^/]*)\/(.*)/,
};

let processedFiles = [];

const processFile = async (file, fromGithub, root = false) => {
  try{
    if(root)
      processedFiles = [];

    if(processedFiles.indexOf(file) !== -1)
      return;

    processedFiles.push(file);
    let result = '';
    let contents;
    let imports;

    if(fromGithub){
      const metadata = regEx.github.exec(file);
      const url = 'https://api.github.com/repos/' + metadata[3] + '/contents/' + metadata[4];
      axios.defaults.headers.post['User-Agent'] = 'sol-straightener';
      contents = Buffer.from((await axios.get(url)).data.content, 'base64').toString();
      contents = contents.replace(regEx.pragma, '').trim();
      imports = await processImports(file, contents, path.dirname(metadata[0]));
    }
    else
    {
      contents = fs.readFileSync(file, { encoding: 'utf-8' });
      contents = contents.replace(regEx.pragma, '').trim();
      imports = await processImports(file, contents);
    }
    for (let i = 0; i < imports.length; i++) {
      result += imports[i] + '\n\n';
    }
    contents = contents.replace(regEx.import, '').trim();
    result += contents;
    return result;
  }
  catch(error){
    throw error;
  }
};

const processImports = async (file, content, githubPrefix = false) => {
  try{
    let group='';
    const result = [];
    let fileContents;
    regEx.import.exec(''); // Resetting state of RegEx
    while (group = regEx.import.exec(content)) {
      let importFile = group[1];
      if(githubPrefix)
        importFile = path.join(githubPrefix, importFile);   // for imports in github file

      if(importFile.substring(0, 10) == 'github.com'){
        fileContents = await processFile(importFile, true);
      }else{
        let filePath = path.join(path.dirname(file), importFile);
        if(!fs.existsSync(filePath)){
          const nodeModulesPath = (await execSync('npm root', { cwd: path.dirname(file) })).toString().trim();
          filePath = path.join(nodeModulesPath, importFile);
        }
        filePath = path.normalize(filePath);
        fileContents = await processFile(filePath, false);
      }
      if (fileContents) {
        result.push(fileContents);
      }
    }
    return result;
  }
  catch(error){
    throw error;
  }
};

const getPragma = async (path) => {
  const contents = fs.readFileSync(path, { encoding: 'utf-8' });
  const group = regEx.pragma.exec(contents);
  return group && group[1];
};

module.exports.processFile = processFile;
module.exports.getPragma = getPragma;
