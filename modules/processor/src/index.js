const env = require('./env');



// ...
const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require("@aws-sdk/client-sqs");

const client = new SQSClient({ region: "eu-north-1" });

const running = true;
const stopRunning = () => {
    console.log('Exiting polling loop');
    running = false;
}

process.on('SIGINT', stopRunning);
process.on('SIGTERM', stopRunning);

const processor = async () => {
    while (running) {
        // TODO 1. Send ReceiveMessageCommand.
        const out = await client.send(new ReceiveMessageCommand({
            QueueUrl: process.env.COPILOT_QUEUE_URI,
            WaitTimeSeconds: 10,
        }));
        // done ...

        if (out.Messages === undefined || out.Messages.length === 0) {
            // note: continue instead of return! 
            continue;
        }
        
        for (const message of out.Messages) {
            const {
                Body,
                ReceiptHandle
            } = message;

            const body      = JSON.parse(Body);
            const requestId = body.Message;

            // ...
            // Process message.
            console.log('Processing request with ID: ' + requestId);

            // TODO 2. Send DeleteMessageCommand to instruct the queue the this message has been handled and can be removed.
            await client.send( new DeleteMessageCommand({
                QueueUrl: process.env.COPILOT_QUEUE_URI,
                ReceiptHandle
            }));
            // Done ...
            
        } 
    }
}

processor();