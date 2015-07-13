/**
 * Created by uvwxy on 13/07/15.
 */

var app = require('express')();
var proxy = require('express-http-proxy');
var static  = require('express-static');


var thrift = require('thrift');
var testSvc = require('./gen-nodejs/TestService');

// thrift proxy
app.use('/api', proxy('localhost:9090', {
    forwardPath: function(req, res) {
        return require('url').parse(req.url).path;
    }
}));

// static webstack
app.use(static(__dirname + '/../app'));

var server = app.listen(3000, function(){
    console.log('Static Server is running at %s', server.address().port);
});



//ServiceHandler: Implement the hello service
var testSvcHandler = {
    setObject: function (t, result) {
        console.log("Received setObject call", t);
        result(null);
    },

    getObject: function (result) {
        var obj = new TestObject();
        obj.name = "Horst";
        obj.mail = "horst@uvwxy.de"

        console.log("Received getObject call", obj);
        result(null, obj);
    }
};

//ServiceOptions: The I/O stack for the service
var testSvcOpt = {
    handler: testSvcHandler,
    processor: testSvc,
    protocol: thrift.TJSONProtocol,
    transport: thrift.TBufferedTransport
};

//ServerOptions: Define server features
var serverOpt = {
    services: {
        "/testService": testSvcOpt
    }
}

//Create and start the web server
var port = 9090;
thrift.createWebServer(serverOpt).listen(port);
console.log("Http/Thrift Server running on port: " + port);
