'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const ddb = new AWS.DynamoDB.DocumentClient();
const Build = require('./buildMadlib');

module.exports.retrieveMadlib = (event, context, callback) => {

  const pin = event.pin;

  const table = process.env.table;
  const params = {
    TableName: table,
    Key: { userPin: pin }
  };

  let responseObj;

  ddb.get(params, (err, data) => {

    if (err) {
      console.error('There was an error retrieving the item', err);
    } else {
      if (data.Item) {
        responseObj = data.Item;
      } else {
        responseObj = { result: false };
        callback(null, responseObj);
      }
    }

  });

};
