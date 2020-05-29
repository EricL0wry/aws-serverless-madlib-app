'use strict';

class InvokeLambda {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    // this.commands = {
    //   welcome: {
    //     usage: 'Helps you start your first Serverless plugin',
    //     lifecycleEvents: ['hello', 'world'],
    //     options: {
    //       message: {
    //         usage:
    //           'Specify the message you want to deploy ' +
    //           '(e.g. "--message \'My Message\'" or "-m \'My Message\'")',
    //         required: true,
    //         shortcut: 'm',
    //       },
    //     },
    //   },
    // };

    this.hooks = {
      'before:welcome:hello': this.beforeWelcome.bind(this)
    };
  }

  beforeWelcome() {
    this.serverless.cli.log('Hello from Serverless!');
  }
}

module.exports = InvokeLambda;
