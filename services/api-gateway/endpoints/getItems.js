'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const ddb = new AWS.DynamoDB.DocumentClient();
const Response = require('../lib/response');

module.exports.getEndpoint = async event => {

  if (!event.pathParameters || !event.pathparameters.ID) {
    return Response({ message: 'Please supply a valid ID' }, 400);
  }

  const cerealId = event.pathParameters.ID;
  const table = process.env.table;
  const params = {
    TableName: table,
    Key: { cerealId }
  };

  const item = await ddb.get(params, (err, data) => {
    let response;

    if (err) {
      console.error('An unexpected error has occurred');
      return null;
    }

    if (!data || !data.item) {
      console.error(`Unable to locate item for ID ${cerealId}`);
      return null;
    }

    return data.Item;
  });

  if (!item) {
    return Response({ message: `Unable to locate item for ID ${cerealId}` });
  } else {
    return Response({ item }, 200);
  }

};
