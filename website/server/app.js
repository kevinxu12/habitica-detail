import setupNconf from './libs/setupNconf';
setupNconf();

import express from 'express';
import nconf from 'nconf';
import http from 'http';
import attachMiddlewares from './middlewares/index';

// Setup translations
// Must come before attach middlewares so Mongoose validations can use translations
import './libs/i18n';

// Load config files
import './libs/setupMongoose';
import './libs/setupPassport';

// Load some schemas & models
import './models/challenge';
import './models/group';
import './models/user';

console.log("surely this hits");
const app = express();
app.set('port', nconf.get('PORT'));

const server = http.createServer();
attachMiddlewares(app, server);

export { server, app };
