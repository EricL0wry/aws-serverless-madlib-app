'use strict';

class InvokeLambda {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.commands = {
      unpack: {
        usage: 'Manually invokes lambda function to extract data from S3 to DDB',
        lifecycleEvents: ['invoke']
      }
    }
    this.hooks = {
      'after:deploy:deploy': this.importDatabase.bind(this),
      'unpack:invoke': this.importDatabase.bind(this)
    };
  }

  importDatabase() {
    const { region } = this.serverless.service.provider;
    const { name } = this.serverless.service.functions.updateDynamoDb;
    const AWS = require("aws-sdk");
    const lambda = new AWS.Lambda({ region: region });

    this.serverless.cli.log('Processing database file');

    const params = {
      FunctionName: name
    };

    lambda.invoke(params, (err, data) => {
      if(err){
        console.error(err);
      } else {
        if(data.StatusCode === 200){
          this.serverless.cli.log('Database file successfully imported into DynamoDB');
        }
      }
    });

  }
}

module.exports = InvokeLambda;
