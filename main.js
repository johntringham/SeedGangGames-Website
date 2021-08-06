var http = require('http');
var url = require('url');
var fs = require('fs');

var allowedPublicFolders = ["css", "fonts", "img", "js", "lib", "favicons"]; 

var portNumber = process.env.PORT;
if(process.env.PORT == undefined){
    portNumber = 80;
}

console.log("Starting on port #" + portNumber);

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  let pathName = q.pathname;

  console.log(pathName);

  if(pathName == "/"){
    pathName = "index.html";
  }

  if(pathName == "/timestamp"){
    res.writeHead(200, {'Content-Type': 'text'});
    res.write(Date.now().toString());
    return res.end();
  }

  let folderName = pathName.split("/")[1];
  if(folderName && allowedPublicFolders.findIndex(f => f == folderName) == -1){
    console.log("??");
    pathName = "index.html";
  }

  var filename = "./public/" + pathName;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 

    res.writeHead(200);
    res.write(data);
    return res.end();
  });
}).listen(portNumber);