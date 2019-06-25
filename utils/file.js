'use strict';

const path = require('path'),
  { execSync } = require('child_process'),
  axios = require('axios'),
  fs = require('fs'),
  { getInstalledPath } = require('get-installed-path');

const regEx = {
  pragma: /(pragma solidity (.+?);)/g,
  import: /import ['"](.+?)['"];/g,
  github: /^(https?:\/\/)?(www.)?github.com\/([^/]*\/[^/]*)\/(.*)/,
};

let processedFiles = [];

const getNodeModulesFolders = async (dir) => {
  const parts = path.dirname(dir).split(path.sep);
  const folders = [];
  for (let partIdx = 0; partIdx < parts.length; partIdx++) {
    const part = parts[partIdx];

    if (folders.length === 0) {
      folders.push(path.join(path.sep, part, 'node_modules'));
    }
    else {
      folders.push(path.join(path.dirname(folders[partIdx - 1]), part, 'node_modules'));
    }
  }

  const rootNodeModules = (await execSync('npm root', { cwd: dir })).toString().trim();

  return [...folders.reverse(), rootNodeModules];
};

const getNodeModulePath = async (name, { cwd }) => {
  return getInstalledPath(name, {
    paths: await getNodeModulesFolders(cwd),
    cwd,
  });
};

const processFile = async (file, fromGithub, root = false) => {
  try {
    if (root)
      processedFiles = [];

    if (processedFiles.indexOf(file) !== -1)
      return;

    processedFiles.push(file);
    let result = '';
    let contents;
    let imports;

    if (fromGithub) {
      const metadata = regEx.github.exec(file);
      const url = 'https://api.github.com/repos/' + metadata[3] + '/contents/' + metadata[4];
      axios.defaults.headers.post['User-Agent'] = 'sol-straightener';
      contents = Buffer.from((await axios.get(url)).data.content, 'base64').toString();
      contents = contents.replace(regEx.pragma, '').trim();
      imports = await processImports(file, contents, path.dirname(metadata[0]));
    }
    else {
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
  catch (error) {
    throw error;
  }
};

const processImports = async (file, content, githubPrefix = false) => {
  try {
    let group = '';
    const result = [];
    let fileContents;
    regEx.import.exec(''); // Resetting state of RegEx
    while (group = regEx.import.exec(content)) {
      let importFile = group[1];
      if (githubPrefix)
        importFile = path.join(githubPrefix, importFile);   // for imports in github file

      if (importFile.substring(0, 10) == 'github.com') {
        fileContents = await processFile(importFile, true);
      } else {
        let filePath = path.join(path.dirname(file), importFile);
        if (!fs.existsSync(filePath)) {
          const nodeModulesPath = await getNodeModulePath(path.dirname(importFile), { cwd: path.dirname(file) });
          filePath = path.join(nodeModulesPath, path.basename(importFile));
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
  catch (error) {
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
