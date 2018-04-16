function getAllLandingPages (db) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('landingpages');

    collection.find({}).toArray(function(err, docs) {
      if (!err) {
        console.log("Found the following records");
        console.log(docs);
        resolve(docs);
      } else {
        reject(err);
      }
    });
  })
}

module.exports = {
    getAllLandingPages: getAllLandingPages
};
