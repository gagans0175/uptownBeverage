const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.keyword('orange')('\n   ---------------------------------');

const logger = {
  error: err => {
    console.error(chalk.red(err));
  },

  appStarted: (port, host, protocol = 'http') => {
    console.log('');
    console.log(`${chalk.greenBright('✓  Server started. See details Below:')}`);
    console.log('');
    console.log(`   ${chalk.yellow.bold('Access URLs:')}${divider}
    ${chalk.cyanBright.bold('Localhost')}: ${chalk.cyanBright(`${protocol}://${host}:${port}`)}
    ${chalk.cyanBright.bold('LAN')}: ${chalk.cyanBright(`${protocol}://${ip.address()}:${port}`)}${divider}
    ${chalk.blueBright(`Press ${chalk.italic.bold.greenBright('CTRL-C')} to stop the server.`)}
    `);
  },
};

module.exports = logger;