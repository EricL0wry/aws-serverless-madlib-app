'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3();
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.updateDynamoDb = (event, context, callback) => {
  const bucketName = 'cereal-bucket';
  const keyName = 'shortCereals.json';
  const params = { Bucket: bucketName, Key: keyName };

  s3.getObject(params, (err, data) => {
    let cereals;

    if (err) {
      console.error(err);
    } else {
      cereals = JSON.parse(data.Body);

      for (let i = 0; i < cereals.length; i++) {
        const cereal = cereals[i];
        console.log(cereal);
        addItem(cereal);
      }
    }

  });
};

const addItem = itemObj => {
  const params = {
    TableName: 'cerealTable',
    Item: itemObj
  };

  ddb.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add item. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log(`Item ${params.Item.name} added!`);
    }
  });
};
