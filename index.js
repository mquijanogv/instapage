const Server = require('./server/server');
const MongoClient = require('mongodb').MongoClient;
//TODO: connect to mongo based on config file
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'LandingPages';

MongoClient.connect(url, function(err, client) {
  if (!err) {
    console.log("Connected successfully to MongoDB");
    const db = client.db(dbName);
    new Server().start(db);
  } else {
    console.log("Failed to Connect to MongoDB. Server will not start");
    client.close();
  }
});
