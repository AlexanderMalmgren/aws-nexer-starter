const env = require('env-var');

// ...
const {
    requestsTopic
} = JSON.parse(process.env.COPILOT_SNS_TOPIC_ARNS);

const port = env.get('PORT').default('80').asPortNumber();
        
// ...

module.exports = {
    port,
    requestsTopic
};