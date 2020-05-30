'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const s3 = new AWS.S3();
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.updateDynamoDb = (event, context, callback) => {
  const bucketName = process.env.bucket;
  const keyName = process.env.key;
  const params = { Bucket: bucketName, Key: keyName };

  s3.getObject(params, (err, data) => {
    let items;

    if (err) {
      console.error(err);
    } else {
      items = JSON.parse(data.Body);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        addItem(item);
      }
    }

  });
};

const addItem = itemObj => {
  const params = {
    TableName: process.env.table,
    Item: itemObj
  };

  ddb.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add item. Error:', JSON.stringify(err));
    }
  });
};
