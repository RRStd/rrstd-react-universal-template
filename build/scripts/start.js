const logger = require('../lib/logger');
require('babel-polyfill');

logger.info('Starting server...');
require('../../server/main').listen(3000, () => {
  logger.success('Server is running at http://localhost:3000');
});
