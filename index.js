#!/usr/bin/env node

var createMenu = require('terminal-menu');
var FeedParser = require('feedparser');
var request = require('request');
var posts = [];
var colors = require('colors');
var prompt = require('prompt');
var exec = require('child_process').exec;
var platform = require('os').platform();
var i = 1;

/*
 * Menu map with the {title} - {url}
 */
const menuMap = {
  "breaking_news": "http://www.dailymirror.lk/RSS_Feeds/breaking-news",
  "world_news": "http://www.dailymirror.lk/RSS_Feeds/world-news-main",
  "business": "http://www.dailymirror.lk/RSS_Feeds/business-main",
  "opinion": "http://www.dailymirror.lk/RSS_Feeds/opinion",
  "sports": "http://sports.dailymirror.lk/rss",
  "video": "http://www.dailymirror.lk/RSS_Feeds/videos",
  "cartoon": "http://www.dailymirror.lk/RSS_Feeds/cartoon-of-the-day",
  "travel": "http://www.dailymirror.lk/RSS_Feeds/travel-main",
  "technology": "http://www.dailymirror.lk/RSS_Feeds/technology"
}

const shellOpenCommand = {
  'win32': 'start ',
  'linux': 'xdg-open ',
  'darwin': 'open '
}[platform];

var menu = createMenu({ width: 29, x: 4, y: 2 });
menu.reset();
menu.write('Dailymirror.lk News Terminal\n');
menu.write('-------------------------\n');

for (var k in menuMap) {
  $menu_title = k.replace('_', " ")
  menu.add($menu_title.toUpperCase());
}

menu.add('EXIT');

menu.on('select', function (label) {
    menu.close();
    if (label != 'EXIT') {
      $selectedItem = label.replace(" ", "_").toLowerCase();    
      initRequest(menuMap[$selectedItem]);  
    }    
});
menu.createStream().pipe(process.stdout);

/*
 * Initialize the request with given feed url.
 */
function initRequest(url) {
  request(url)
  .pipe(new FeedParser())
  .on('error', function(error) {
    console.log("An error occured");
  })
  .on('readable', function () {
    var stream = this, item;
    if(i < 29){
      while (item = stream.read()) {
      posts.push(item);
      console.log(i.toString().red + ". " + item.title);
      i++;
    }
    }
  })
  .on('finish', function(){
    promptForPost();
  });
}

/*
 * Promt post to cli
 */
function promptForPost() {
  prompt.start();

  var schema = {
    properties: {
      post: {
        message: 'Type post number to open, or 0 to quit',
        required: true
      },
    }
  };

  prompt.get(schema, function (err, result) {
    if(result.post !== "0"){
      var i = parseInt(result.post);
      if(isNaN(i) || i > posts.length || i < 1) {
        console.log("Invalid post number");
      } else {
        exec(shellOpenCommand + posts[i - 1].link, function(error){
          if(error) throw error;
        });
      }
      promptForPost();
    }
  });
}