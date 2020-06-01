'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const ddb = new AWS.DynamoDB.DocumentClient();
const Response = require('../lib/response');

module.exports.getMadlib = async event => {

  if (!event.pathParameters || !event.pathParameters.ID) {
    return Response({ message: 'Please supply a valid ID' }, 400);
  }

  const itemId = parseInt(event.pathParameters.ID, 10);
  const table = process.env.table;
  const params = {
    TableName: table,
    Key: { madLibId: itemId }
  };

  try {
    const item = await ddb.get(params).promise();
    const response = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 200,
      body: JSON.stringify({ item })
    };
    return response;
  } catch (err) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
  //  getItem(params).then(data => {
  //     console.log(data.Item);
  //     if (!data.Item) {
  //       return Response({ message: 'Unable to locate item' }, 404);
  //     } else {
  //       return Response(data.Item, 200);
  //     }
  //   })
  //     .catch(err => {
  //       console.error(`There was an error retrieving item ${itemId}`, err);
  //       return Response({ message: `There was an error retrieving item ${itemId}` }, 400);
  //     });

  // const item = await ddb.get(params, (err, data) => {

  //   if (err) {
  //     console.error('An unexpected error has occurred');
  //     return null;
  //   }

  //   if (!data || !data.item) {
  //     console.error(`Unable to locate item for ID ${itemId}`);
  //     return null;
  //   }

  //   return data.Item;
  // });

  // if (!item) {
  //   return Response({ message: `Unable to locate item for ID ${itemId}` });
  // } else {
  //   return Response({ item }, 200);
  // }

};
