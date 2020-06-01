'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const ddb = new AWS.DynamoDB.DocumentClient();
const Response = require('../lib/response');

module.exports.postMadlibSubmission = async event => {

  const madlib = JSON.parse(event.body);
  const pin = Math.floor(1000 + Math.random() * 9000);
  const table = process.env.table;
  madlib.userPin = pin;

  const params = {
    TableName: table,
    Item: madlib
  };

  try {
    await ddb.put(params).promise();
    return Response({ status: 'Success', userPin: pin });
  } catch (err) {
    console.error('There was an error submitting a user madlib', err);
    return Response({ message: 'There was an unexpected error submitting your request' }, 500);
  }

};
