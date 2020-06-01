'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const ddb = new AWS.DynamoDB.DocumentClient();
const Response = require('../lib/response');

module.exports.getMadlibList = async event => {
  // return Response({ message: 'test response' }, 200);

  const table = process.env.table;
  const params = {
    TableName: table,
    ProjectionExpression: 'madLibId, name'
  };

  try {
    const madLibList = await ddb.scan(params).promise();
    return madLibList;
  } catch (err) {
    console.error('There was an error getting a list of Madlibs', err);
  }
};
