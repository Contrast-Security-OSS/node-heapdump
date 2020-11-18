#!/usr/bin/env node
'use strict';
const yargsInteractive = require('yargs-interactive');
const cp = require('child_process');
const os = require('os');
const fs = require('fs');
const pa = require('path');
const artifactName = 'heapdump.tgz.zip';

const options = {
  interactive: { default: true },
  releaseType: {
    type: 'list',
    describe: 'What kind of release do you want to make?',
    choices: ['patch', 'minor', 'major']
  },
  artifactPath: {
    type: 'input',
    describe: `What directory is ${artifactName} in?`
  }
};

yargsInteractive()
  .usage('$0 [args]')
  .interactive(options)
  .then(({ releaseType, artifactPath }) => {
    artifactPath =
      artifactPath[0] === '~' ? artifactPath.substring(2) : artifactPath;
    const path = pa.resolve(os.homedir(), artifactPath);

    if (fs.existsSync(`${path}/${artifactName}`)) {
      cp.execSync(`${__dirname}/npm-publish.sh ${releaseType} ${path}`, {
        stdio: 'inherit'
      });
    } else {
      console.log('%s not found', artifactName);
    }
  })
  .catch((err) => {
    console.log('Publishing failed:');
    console.log(err);
  });
