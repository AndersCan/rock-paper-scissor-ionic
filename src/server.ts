import * as express from 'express';
import * as path from 'path';
import * as http from 'http'
import * as url from 'url'
import * as WebSocket from 'ws'
import { Server } from 'colyseus';
import { ChatRoom } from './rooms/ChatRoom'

const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'))

const server = http.createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: server });

// Register ChatRoom as "chat"
gameServer.register("chat", ChatRoom);

server.listen(app.get('port'), function listening() {
  console.log('Listening on %d', server.address().port);
});

// const wss = new WebSocket.Server({ server });

// wss.on('connection', function connection(ws) {
//   // const location = url.parse(ws.upgradeReq.url, true);
//   // You might use location.query.access_token to authenticate or share sessions
//   // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//     ws.send('thanks for this: ' + message)
//   });

//   ws.send('something');
// });
