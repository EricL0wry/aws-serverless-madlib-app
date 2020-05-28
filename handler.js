'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3();
// const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.updateDynamoDb = (event, context, callback) => {
  console.log('Ok');
  const bucketName = 'cereal-bucket'; // Name of Bucket
  const keyName = 'shortCereals.json'; // File Name in Bucket
  const params = { Bucket: bucketName, Key: keyName };

  s3.getObject(params, (err, data) => {

    if (err) {
      console.log(err);
    } else {
      console.log(data.Body.toString());
    }

  });
};
