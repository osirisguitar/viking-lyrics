'use strict';

const http = require('http');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function saveAlbum (url) {
  let options = {
    host: 'www.darklyrics.com',
    path: url.substring(2)
  };

  let request = http.request(options, (response) => {
    let result = '';

    response.on('data', chunk => {
      result += chunk;
    });

    response.on('end', () => {
      if (response.statusCode == 200) {
        let jsdom = new JSDOM(result);

        console.log(jsdom.window.document.querySelector('div.lyrics').textContent);
      }
    });
  });

  request.on('error', (e) => {
    console.error('Oh no', e)
  })

  request.end();
}

let options = {
  host: 'www.darklyrics.com',
  path:  process.argv[2]
};

let request = http.request(options, (response) => {
  let str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    let jsdom = new JSDOM(str);
    let albumUrls = [];

    jsdom.window.document.querySelectorAll('.album a[href]').forEach(linkNode => {
      let link = linkNode['href'];
      let trimLink = link.substring(0, link.indexOf('#'));
      
      if (albumUrls.indexOf(trimLink) === -1) {
        albumUrls.push(trimLink);
      }
    });

    albumUrls.forEach(albumUrl => {
      saveAlbum(albumUrl);
    });
  });
});

request.end();
