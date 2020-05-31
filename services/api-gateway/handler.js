'use strict';

module.exports.getEndpoint = async event => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Get Request Received!',
        input: event
      },
      null,
      2
    )
  };

};
