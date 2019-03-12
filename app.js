var express = require('express');
var log4js = require('log4js');

var app = express();

if (process.env.VCAP_APPLICATION) {
    log4js.configure({
        appenders: { out: { type: 'stdout', layout: { type: 'basic' } } },
        categories: { default: { appenders: ['out'], level: process.env.LOGLEVEL || 'info' } }
      });
}

var logger = log4js.getLogger();
logger.level = process.env.LOGLEVEL || 'error';

app.get('/', function (req, res) {
    logger.trace('Entering / handler');
    logger.debug(process.env);
    logger.info('This is a logging test');
    logger.warn('Warning log message');
    logger.error('An error has not occurred but this is an error level message');
    logger.fatal('Witty fatal error message here');
    
    res.send('Hello World from Node!');

});
app.listen(process.env.PORT || 3000);