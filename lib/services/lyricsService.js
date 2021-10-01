'use strict';

const { spawn } = require('child_process');

function getLyrics (size, temperature, startPhrase) {
  console.log('Generating', size, temperature, startPhrase)
  return new Promise((resolve, reject) => {
    let args = ['sample.lua', '-checkpoint', 'cv/checkpoint_11300.t7', '-length', size, '-gpu', '-1', '-temperature', temperature];
    if (startPhrase) {
      args.push('-start_text');
      args.push(startPhrase);
    }
    const torch = spawn('th', args, { cwd: '/root/torch-rnn'});

    let output = '';
    let error = '';

    torch.stdout.on('data', data => {
      output += data.toString();
    })

    torch.stderr.on('data', data => {
      error += data.toString();
    })

    torch.on('close', code => {
      if (code != 0 || error !== '') {
        console.error(error);
        return reject(new Error(error));
      } else {
        return resolve({
          size: size,
          temperature: temperature,
          startPhrase: startPhrase,
          lyrics: output.split('\n')
        });
      }
    });
  });
}

module.exports = {
  getLyrics
}