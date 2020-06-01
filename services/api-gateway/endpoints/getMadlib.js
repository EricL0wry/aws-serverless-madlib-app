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
    } else {
      const { madLibId, madLibName } = madLib.Item;
      const responseObj = {};
      const wordList = {};
      responseObj.madLibId = madLibId;
      responseObj.madLibName = madLibName;

      for (const key in madLib.Item) {
        if (key.includes('word')) {
          wordList[key] = madLib.Item[key];
        }
      }

      responseObj.words = wordList;

      return Response(responseObj, 200);
    }
  } catch (err) {
    console.error(`There was an error getting ID ${itemId} from table`, err);
    return Response({ message: 'There was an unexpected error retrieving your item' }, 500);

  }
};
