const { run } = require('runjs');
const processArgs = require('minimist')(process.argv.slice(2));

// const { argv } = require('process')
// console.log(processArgs, argv)

const mode = processArgs.mode ? processArgs.mode : 'build';

const runService = () => {
  if (processArgs._.length > 1) {
    const action = processArgs._[0];
    run(`npx vue-cli-service ${mode} --action=${action} --name=${processArgs._[1]}`);
  } else {
    run(`npx vue-cli-service ${mode}`);
  }
};

runService();
