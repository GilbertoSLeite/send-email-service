const configAws = {
    region: 'sa-east-1',
    sqs: {
      httpOptions: {
        timeout: 25000,
      },
    },
    kms: {
      apiVersion: '2014-11-01'
    },
    s3: {
      // configurações aqui
    },
    secretsmanager: {
      // configurações aqui
    }
};

module.exports = configAws;