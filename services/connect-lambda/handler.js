'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.retrieveMadlib = (event, context, callback) => {

  const pin = event.pin;

  const table = process.env.submissionTable;
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
        const { userName, madLibId } = data.Item;
        const wordList = {};
        for (const key in data.Item) {
          if (key.includes('word')) {
            wordList[key] = data.Item[key];
          }
        }

        const parameters = {
          TableName: process.env.templateTable,
          Key: { madLibId: madLibId }
        };

        ddb.get(parameters, (err, data) => {

          if (err) {
            console.error('There was an error retrieving the item', err);
          } else {
            if (data.Item) {
              const { madLibName, text } = data.Item;
              const madLibText = text.replace(/\$\$(.*?)\$\$/g, (match, pos) => {
                return wordList[pos];
              });

              responseObj = {
                userName: userName,
                madLibName: madLibName,
                madLibText: madLibText
              };

              callback(null, responseObj);
            } else {
              responseObj = { result: false };
              callback(null, responseObj);
            }
          }
        });

      } else {
        responseObj = { result: false };
        callback(null, responseObj);
      }
    }

  });

};
