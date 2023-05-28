/**
 * Discount Courses - The Nodje.js Master Class
 */

//Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;


//Configure the server to respond to all requests with a string
var server = http.createServer(function(req,res){

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

      // Send the response
      res.writeHead(200, {'Content-Type': 'text/plain'} );
      res.write('Hello, world! \n');
      res.end();       

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

server.listen(3000,function(){
    console.log('The server is up and running now');
});