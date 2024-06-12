/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fsx = require("fs-extra");
const fsPath = require("fs-path");
const { readdirSync } = require("fs");

const _getComponentsWithTokens = async () => {
  const source = path.resolve(__dirname, "../components");
  return readdirSync(source, { withFileTypes: true })
    .filter(componentDir => componentDir.isDirectory())
    .filter(componentDir => fsx.existsSync(path.resolve(__dirname, `../components/${componentDir.name}/tokens/`)))
    .map(componentDir => {
      return componentDir.name;
    });
};

const _getTokenFiles = async componentName => {
  const source = path.join(__dirname, `../components/${componentName}/tokens`);
  return readdirSync(source, { withFileTypes: true }).map(tokenFile => {
    return tokenFile.name;
  });
};

const _createImportName = input => {
  return input
    .split(".")[0]
    .toLowerCase()
    .replace(/-(.)/g, function(match, group1) {
      return group1.toUpperCase();
    });
};

const createTokenFilesModule = async () => {
  const components = await _getComponentsWithTokens();

  const autoGeneratedMessage = `//----------------------------------------------------------
// Do not edit this file directly. This is generated from
// Lumos color tokens & imported Momentum color tokens.
// src/components/\${componentName}/tokens/*.js
// @momentum-ui/tokens/src/core/\${componentName}.js
//----------------------------------------------------------\n
`;

  let result = `${autoGeneratedMessage}/* eslint-disable no-undef */\n/* eslint-disable @typescript-eslint/no-var-requires */\n`;
  let references = [];
  let fileNames = [];

  for (const componentName of components) {
    const tokenFileNames = await _getTokenFiles(componentName);

    for (const tokenFileName of tokenFileNames) {
      if (tokenFileName === ".DS_Store") {
        continue;
      }
      else if (!tokenFileName.endsWith(".js")) {
        console.error(`${tokenFileName} is not the correct file type. It should be a javascript file.`);
        process.exit(1);
      }  

      const importName = _createImportName(tokenFileName);
      references.push(importName);
      fileNames.push(`"${tokenFileName}"`);
      result += `const ${importName} = require("../../components/${componentName}/tokens/${tokenFileName}");\n`;
    }
  }
  references = references.join(",\n  ");
  result += `\nconst tokenFiles = [\n  ${references}\n];\n`;

  fileNames = fileNames.join(",\n  ");
  result += `\nconst tokenFileNames = [\n  ${fileNames}\n];\n`;
  result += `\nmodule.exports = {\n  tokenFiles,\n  tokenFileNames\n};\n`;

  // check this path exists
  const tokenFileModule = path.resolve(__dirname, "../tokens/vars/tokenFiles.js");
  fsPath.writeFile(tokenFileModule, result, err => {
    if (err) throw err;
    console.log(tokenFileModule + " updated");
  });
};

createTokenFilesModule();
