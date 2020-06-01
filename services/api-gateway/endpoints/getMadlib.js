'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const ddb = new AWS.DynamoDB.DocumentClient();
const Response = require('../lib/response');

module.exports.getMadlib = async event => {

  const itemId = parseInt(event.pathParameters.ID, 10);

  if (!itemId) {
    return Response({ message: 'Please enter a valid MadLib ID' }, 400);
  }

  const table = process.env.table;
  const params = {
    TableName: table,
    Key: { madLibId: itemId }
  };

  try {
    const madLib = await ddb.get(params).promise();
    if (!madLib.Item) {
      return Response({ message: `Unable to locate MadLib with ID ${itemId}` }, 404);
    }
    return Response(madLib.Item, 200);
  } catch (err) {
    console.error(`There was an error getting ID ${itemId} from table`, err);
    return Response({ message: 'There was an unexpected error retrieving your item' }, 500);

  }
};
