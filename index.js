var createMenu = require('terminal-menu');

/*
 * Menu map with the {title} - {url}
 */
var menuMap = {
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
    $selectedItem = label.replace(" ", "_").toLowerCase();
    console.log(menuMap[$selectedItem]);
});

menu.createStream().pipe(process.stdout);