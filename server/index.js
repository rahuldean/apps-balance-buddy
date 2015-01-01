/**
 * Created by Rahul Reddy Malkireddy on 1/1/15.
 */
var express                 = require('express'),
    app                     = express(),
    mongoose                = require('mongoose');

var environment             = require('./config/environment'),
    route                   = require('./routes');

mongoose.connect(environment.db);
mongoose.connection.on('error', function(){
    console.log('Failed to connect to database');
});

mongoose.connection.on('open', function(){
    console.log('Connected to database ' + environment.db);

    // Start the node server
    var server = app.listen(environment.server.port, environment.server.ip, function(){
        console.log('Server listening at %s on %s', server.address().address, server.address().port);
    });

    route.manage(app);
});