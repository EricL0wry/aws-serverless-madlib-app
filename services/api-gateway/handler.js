'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getEndpoint = async event => {
  const cerealId = event.pathParameters.ID;

  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Get Request Received!',
        input: event
      },
      null,
      2
    )
  };

};
