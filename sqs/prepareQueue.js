const AWS = require('aws-sdk');
const fs = require('fs');

const sqs = new AWS.SQS({ region: 'us-east-1' });
// const queueUrl = 'https://sqs.us-east-1.amazonaws.com/908224992569/generateReportQueueName';

function sendMessage(message,queueUrl) {
  const params = {
    MessageBody: message,
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/908224992569/generateReportQueueName'
  };

  return sqs.sendMessage(params).promise();
}

function sendBulkMessages(messages) {
  const messagePromises = messages.map(sendMessage);
  return Promise.all(messagePromises);
}

// Example usage:
fs.readFile('messages.json', function(err, data) {
  if (err) {
    console.log('Error reading file: ', err);
  } else {
    const messages = JSON.parse(data);
    sendBulkMessages(messages)
      .then(() => {
        console.log('Bulk messages sent successfully');
      })
      .catch((err) => {
        console.log('Error sending bulk messages: ', err);
      });
  }
});
