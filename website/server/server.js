import logger from './libs/logger';

import { server, app } from './app';

server.on('request', app);
server.listen(app.get('port'), () => {
  logger.info(`Express server listening on port ${app.get('port')}`);
});

export default server;
