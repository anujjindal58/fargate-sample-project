const AWS = require('aws-sdk');

const sqs = new AWS.SQS({ region: 'your-region' });
const queueUrl = 'your-queue-url';
const maxRetries = 3;

function pollQueue() {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 30,
    WaitTimeSeconds: 20
  };

  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      console.log('Error receiving message: ', err);
    } else if (data.Messages) {
      const message = data.Messages[0];
      const retryCount = message.Attributes['retry-count'] || 0;
      if (retryCount < maxRetries) {
        const params = {
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle,
          MessageBody: message.Body,
          MessageAttributes: {
            'retry-count': {
              DataType: 'Number',
              StringValue: `${retryCount + 1}`
            }
          }
        };
        sqs.sendMessage(params, function(err, data) {
          if (err) {
            console.log('Error sending message: ', err);
          } else {
            console.log(`Message sent with retry count ${retryCount + 1}`);
          }
        });
      } else {
        console.log(`Message failed after ${maxRetries} retries: `, message.Body);
      }
    }
    setTimeout(pollQueue, 1000); // Poll the queue again after a second
  });
}

pollQueue();