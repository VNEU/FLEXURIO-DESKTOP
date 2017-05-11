var app       = require('app');
var browser   = require('browser-window');
var electrify = require('electrify')(__dirname);

var window    = null;

app.on('ready', function() {
    process.env.MONGO_URL="mongodb://[USERNAME]:[PASSWORD]@[YOUR IP MONGODB]:[YOURPORT]/[YOURDB]";
    process.env.ROOT_URL="http://[YOUR ROOT URL FLEXURIO]";

  // electrify start
  electrify.start(function(meteor_root_url) {

    // creates a new electron window
    window = new browser({
      width: 1000, height: 600,
      'node-integration': false // node integration must to be off
    });

    // open up meteor root url
    window.loadURL(meteor_root_url);
  });
});


app.on('window-all-closed', function() {
  app.quit();
});


app.on('will-quit', function terminate_and_quit(event) {
  
  // if electrify is up, cancel exiting with `preventDefault`,
  // so we can terminate electrify gracefully without leaving child
  // processes hanging in background
  if(electrify.isup() && event) {

    // holds electron termination
    event.preventDefault();

    // gracefully stops electrify 
    electrify.stop(function(){

      // and then finally quit app
      app.quit();
    });
  }
});

