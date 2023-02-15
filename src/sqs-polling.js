const AWS = require('aws-sdk');

// Configure the AWS SDK with your AWS credentials and region
AWS.config.update({
//   accessKeyId: 'your-access-key-id',
//   secretAccessKey: 'your-secret-access-key',
  region: 'us-east-1'
});

// Create an SQS service client
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

// Define the parameters for the receiveMessage API call
const params = {
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/908224992569/generateReportQueueName',
  MaxNumberOfMessages: 2,
  WaitTimeSeconds: 1
};

// Call the receiveMessage API to retrieve messages from the queue
sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
    // Process the messages received from the queue
    // data.Messages.forEach(function(message) {
    //   console.log(message.Body);
    // });
  }
});
