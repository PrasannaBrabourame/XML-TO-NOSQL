let fs = require('fs');
let path = require('path');
let xmlfile = path.join(__dirname, 'sample_chapter.xml');
let xmlParser = require('xml2json');

var a;
fs.readFile(xmlfile, 'utf8', function (err, data) {
    //var json = parser.toJson(data);
    a = JSON.parse(xmlParser.toJson(data));
    //console.log('JSON output', );
});

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'sampledatabase';
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
  const db = client.db(dbName);
  const collection = db.collection('testcollection');
  collection.insertMany([{'item':a.data.item}], function(err, result) {
    console.log("Inserted documents into the collection");
  });
  console.log("Connected successfully to server collection");
  client.close();
});

