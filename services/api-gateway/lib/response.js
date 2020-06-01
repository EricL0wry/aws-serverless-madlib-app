const Response = (data, code) => {

  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: code,
    body: JSON.stringify(data)
  };
};

module.exports = Response;
