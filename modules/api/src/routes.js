const express = require('express');
const superagent = require('superagent');
const crypto = require ('crypto');
const env = require ("./env")
// ...



const routes = express.Router();

const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const client = new SNSClient({ region: "eu-north-1" });

// ...
// TMS API.
routes.get('/status/:requestId', (req, res) => {
    res.send('OK: ' + req.params.requestId);
});

routes.get('/content/:requestId', (req, res) => {
    res.send('OK: ' + req.params.requestId);
});

routes.post('/content', async (req, res) => {
    
    await superagent.post(`http://validator.${process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT}`);
    
    const out = await client.send(new PublishCommand({
        Message: crypto.randomUUID(),
        TopicArn: env.requestsTopic,
      }));
      res.send('OK');
});

// ...

module.exports = routes;