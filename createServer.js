
const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');

const port = 9001;
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  if(req.url === '/'){
    indexPage(req,res);
  }
  else if(req.url === '/index.html'){
    indexPage(req,res);
  }
  else if(req.url === '/contacts.html'){
    contactsPage(req,res);
  }
  else if(req.url === '/getcontacts'){
    getContacts(req,res);
  }
  else if(req.url === '/addContact.html'){
    addContactPage(req,res);
  }
  else if(req.url === '/stock.html'){
    stockPage(req,res);
  }
  else if(req.url === '/postContactEntry'){
    var reqBody = "";
    req.on('data', function(data){
      reqBody += data;
    });
    req.on('end', function (){
      const qs = require('querystring');
      var postObj = qs.parse(reqBody);
      var jsonObj={};
      
      jsonObj["name"]= postObj.name;
      jsonObj["category"]= postObj.category;
      jsonObj["location"]= postObj.location;
      jsonObj["contact"]= postObj.contact;
      jsonObj["email"]= postObj.email;
      jsonObj["website_name"]= postObj.website_name;
      jsonObj["website_url"]= postObj.website_url;
      
      fs.readFile('./contacts.json', function(err, JsonString) {
        if(err) {
          throw err;
        }
        var fileJson = JSON.parse(JsonString); 
        fileJson["contacts"].push(jsonObj);
        var str = JSON.stringify(fileJson);
        fs.writeFile('contacts.json', str, function(err){
          if(err){
            throw err;
          }
        });
        
      });
      // redirect
      res.writeHead(302,{'Location':'/contacts.html'});
      res.end();

     

    });
  }
  else{
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("404 Not Found");
  }
}).listen(port);


function indexPage(req, res) {
  fs.readFile('client/index.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

function contactsPage(req, res) {
  fs.readFile('client/contacts.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

function addContactPage(req, res) {
  fs.readFile('client/addContact.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

function stockPage(req, res) {
  fs.readFile('client/stock.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

function getContacts(req,res) {
  fs.readFile('./contacts.json', function(err, JSON) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/json');
    res.write(JSON);
    res.end();
  });
}

function closure1(reqBody){
  
}