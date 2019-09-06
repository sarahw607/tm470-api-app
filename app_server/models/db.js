const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/tm470';
require('./users');

mongoose.connect(dbURI, {useNewUrlParser: true});

mongoose.connection.on('connected', () => {            
    console.log(`Mongoose connected to ${dbURI}`);       
  });                                                    
  mongoose.connection.on('error', err => {               
    console.log('Mongoose connection error:', err);      
  });                                                    

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});