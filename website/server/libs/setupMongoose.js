import nconf from 'nconf';
import mongoose from 'mongoose';
import logger from './logger';
import {
  getDevelopmentConnectionUrl,
  getDefaultConnectionOptions,
} from './mongodb';

const IS_PROD = nconf.get('IS_PROD');
const MAINTENANCE_MODE = nconf.get('MAINTENANCE_MODE');
const POOL_SIZE = nconf.get('MONGODB_POOL_SIZE');

// Do not connect to MongoDB when in maintenance mode
if (MAINTENANCE_MODE !== 'true') {
  console.log("WE OUT HERE");
  const mongooseOptions = getDefaultConnectionOptions();

  if (POOL_SIZE) mongooseOptions.maxPoolSize = Number(POOL_SIZE);

  const DB_URI = nconf.get('IS_TEST') ? nconf.get('TEST_DB_URI') : nconf.get('NODE_DB_URI');
  const connectionUrl = IS_PROD ? DB_URI : getDevelopmentConnectionUrl(DB_URI);

  console.log(`DB_URI ${DB_URI}`);
  console.log(`CONNECTION ${connectionUrl}`);
  mongoose.connect(connectionUrl, mongooseOptions).then(() => {
    console.log("and we in mongoose");
    logger.info('Connected with Mongoose.');
  }).catch(err => {
    console.log("failed to connect to mongoose");
    console.log(err);
    logger.error(err);
    throw err;
  });
}
