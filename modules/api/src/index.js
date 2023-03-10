const express   = require('express');
const env       = require('./env');
const routes    = require('./routes');


// ...
const app = express();
app.use(express.json());
app.use('/v1', routes);
//app.use('/v2', routes)

app.get('/', (req, res) => {
    res.send('200 ok');
});

// ...

const server = app.listen(env.port, () => {
    console.log('listening to port: ', env.port);
    
});

process.on('SIGTERM', () => {
    server.close(() => {
      // TBD: Cleanup, e.g. closing the server and various connections.
      console.log('API server closed');

      process.exit(0);
    });
})