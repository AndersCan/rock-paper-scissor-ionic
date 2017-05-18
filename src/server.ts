import * as express from 'express';
import * as http from 'http'
import * as url from 'url'
import * as WebSocket from 'ws'

const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  // const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('thanks')
  });

  ws.send('something');
});

server.listen(app.get('port'), function listening() {
  console.log('Listening on %d', server.address().port);
});