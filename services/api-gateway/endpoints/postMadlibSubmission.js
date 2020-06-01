'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const ddb = new AWS.DynamoDB.DocumentClient();
const Response = require('../lib/response');

module.exports.getMadlib = async event => {
  return Response({ message: 'Test Response' }, 200);
};
