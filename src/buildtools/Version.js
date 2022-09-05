const fs = require('fs');

const hash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

const appVersion = require('child_process')
    .execSync(`npm -s run env echo '$npm_package_version'`)
    .toString()
    .trim();

const data = {
    hash: hash,
    appVersion: appVersion,
};

fs.writeFileSync('./src/buildtools/version-info.json', JSON.stringify(data));
console.log('wrote version data to version-info.json file');
