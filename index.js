/**
 * Discount Courses - The Nodje.js Master Class
 */

//Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var _data =  require('./lib/data');
console.log('config:',config);

//Testing create data
_data.create('test','newfile',{'foo':'bar'},function(err){
  if(err){
    console.log('this was the error', err);
  }
});

//Testing read data
/*_data.read('test','newfile',function(err,data){
  if(!err){
    console.log('this was the data:',data);
  }else{
    console.log('this was the error:',err);
  }  
});*/

//Testing update data
/*_data.update('test','newfile',{'foo3':'bar3'},function(err){
  if(err){
    console.log('this was the error', err);
  }
});*/

//Testing update data
/*_data.delete('test','newfile',function(err){
  if(err){
    console.log('this was the error', err);
  }
});*/


 // Instantiate the HTTP server
 var httpServer = http.createServer(function(req,res){
  unifiedServer(req,res);
});

// Start the HTTP server
httpServer.listen(config.httpPort,function(){
  console.log('The HTTP server is running on port '+config.httpPort);
});

// Instantiate the HTTPS server
var httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions,function(req,res){
  unifiedServer(req,res);
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort,function(){
 console.log('The HTTPS server is running on port '+config.httpsPort);
});

var unifiedServer = function(req,res){
  //Parse the url
  var parsedUrl = url.parse(req.url, true);

  //Geh the path
  var path = parsedUrl.pathname;    
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');       

  // Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // Get the HTTP method
  var method = req.method.toLowerCase();

  // Get the headers as an object
  var headers = req.headers;

   // Get the payload,if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';    

  req.on('data', function(data) {
    buffer += decoder.write(data);
  });
  
  req.on('end', function() {
    buffer += decoder.end();

    // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    var data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };

    // Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload){

      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Use the payload returned from the handler, or set the default payload to an empty object
      payload = typeof(payload) == 'object'? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // Send the response
      res.writeHead(statusCode, {'Content-Type': 'text/plain'} );
      res.write('Hello, world! \n');
      res.end(payloadString);       

      // Log the request/response
      console.log('Request received on path: '+trimmedPath);
      console.log(`Method: ${method}`);
      console.log('Query String Object: ',queryStringObject);

      // Log the request/response
      console.log('Request received on path: '+trimmedPath);
      console.log(`Method: ${method}`);
      console.log('Query String Object: ',queryStringObject);
      console.log('Request received with these headers:', headers);   
      console.log('Request received with this payload: ',buffer);
    });
  });    
}

// Define all the handlers
var handlers = {};

// Sample handler
handlers.sample = function(data,callback){
    callback(406,{'name':'sample handler'});
};

// Ping handler
handlers.ping = function(data,callback){
  callback(200);
};

// Not found handler
handlers.notFound = function(data,callback){
  callback(404);
};

// Define the request router
var router = {
  'sample' : handlers.sample,
  'ping' : handlers.ping
};

