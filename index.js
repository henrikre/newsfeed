import mongoose from 'mongoose';
import app from './src/server';
import config from './src/config';

let cfg;

if(process.env.NODE_ENV === "development"){
	cfg = Object.assign({}, config.development);
} else {
  cfg = Object.assign({}, config.production);
}

// Connect to DB
let db = mongoose.connect(cfg.db);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection:', cfg.db);
});

app.listen(cfg.port, err => {
  if(err) throw err;
  console.log("Listening on port:", cfg.port);
});

export default app;
