'use strict';

const restify = require('restify');
const server = restify.createServer();
const lyricsService = require('./services/lyricsService');

const config = require('./config.js');

server.use(restify.plugins.queryParser());

server.get('/lyrics', (req, res, next) => {
  let length = req.query['length'] || 1000;
  let temperature = req.query['temperature'] || 0.5;
  let start = req.query['start'] || '';

  return lyricsService.getLyrics(length, temperature, start)
    .then(result => {
      res.send(result);
      return next();
    })
    .catch(error => {
      return next(error);
    });
});

server.get('/*', restify.plugins.serveStatic({
  directory: './lib/static',
  default: 'index.html'
}))

server.listen(config.port || 8899);