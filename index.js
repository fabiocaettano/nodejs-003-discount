/**
 * 
 */

//Dependencies
var http = require('http');
var url = require('url');

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

    

    // Log the request/response
    console.log('Request received on path: '+trimmedPath);
    console.log(`Method: ${method}`);
    console.log(queryStringObject);
    
    
    // control for favicon
    if (trimmedPath === 'favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        console.log('favicon requested \n');
        return;
    }

    // not the favicon   
    res.writeHead(200, {'Content-Type': 'text/plain'} );
    res.write('Hello, world! \n');
    res.end();     

    
});

server.listen(3000,function(){
    console.log('The server is up and running now');
});