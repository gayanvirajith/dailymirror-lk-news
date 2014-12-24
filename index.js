var createMenu = require('terminal-menu');

var menu = createMenu({ width: 29, x: 4, y: 2 });
menu.reset();
menu.write('Dailymirror.lk News Terminal\n');
menu.write('-------------------------\n');

menu.add('Breaking News');
menu.add('World News');
menu.add('Business');
menu.add('Opinion');
menu.add('Sports');
menu.add('Video');
menu.add('Cartoon');
menu.add('Travel');
menu.add('Technology');
menu.add('EXIT');

menu.on('select', function (label) {
    menu.close();
    console.log('SELECTED: ' + label);
});
menu.createStream().pipe(process.stdout);