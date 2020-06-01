'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const ddb = new AWS.DynamoDB.DocumentClient();
const Response = require('../lib/response');

module.exports.getMadlibList = async event => {

  const table = process.env.table;
  const params = {
    TableName: table,
    ProjectionExpression: 'madLibId, madLibName'
  };

  try {
    const madLibList = await ddb.scan(params).promise();
    if (!madLibList.Items) {
      return Response({ message: 'There are no Madlibs in the list' }, 404);
    }
    return Response(madLibList.Items, 200);
  } catch (err) {
    console.error('There was an error getting a list of Madlibs', err);
    return Response({ message: 'There was an unexpected error retrieving your list' }, 500);
  }
};
