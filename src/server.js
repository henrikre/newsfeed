import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import requestIp from 'request-ip';
import config from './config';

import feed from './feed';
import api from './routes';

let app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(requestIp.mw());

app.use('/api', api)

feed.getLatestArticles('http://uutimet.net/rss/?show=helsinginsanomat,iltalehti,mtv3,yle');
setInterval(() => {
  feed.getLatestArticles('http://uutimet.net/rss/?show=helsinginsanomat,iltalehti,mtv3,yle');
}, 600000);

export default app;
