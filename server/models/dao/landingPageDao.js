const COLLECTION = 'landingpages';

function getAllLandingPages(db) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(COLLECTION);
    collection.find({}).toArray(function(err, docs) {
      if (!err) {
        resolve(docs);
      } else {
        reject(err);
      }
    });
  });
}

function insertLandingPage(db, content) {
  return new Promise((resolve, reject) => {
    checkSlugDup(db, content.slug)
    .then((res) => {
      if (res.length > 0) {
        reject({errors:"Duplicate"});
      }
      const collection = db.collection(COLLECTION);
      collection.insert(content, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

function checkSlugDup(db, slug) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(COLLECTION);
    collection.find({"slug":slug}).toArray(function(err, docs) {
      if (!err) {
        resolve(docs);
      } else {
        reject(err);
      }
    })
  })
}

function findLandingPage(db, slug) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(COLLECTION);
    collection.find({"slug":slug}).toArray(function(err, docs) {
      if(!err) {
        resolve(docs);
      } else {
        reject(err);
      }
    });
  });
}

function incrementVisitCounter(db, slug) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(COLLECTION);
    collection.updateOne({"slug":slug},{$inc: {visits:1}}, function(err, result) {
      if(!err){
        resolve(result);
      } else {
        reject(err);
      }
    })
  });
}

module.exports = {
    getAllLandingPages: getAllLandingPages,
    insertLandingPage: insertLandingPage,
    findLandingPage: findLandingPage,
    incrementVisitCounter: incrementVisitCounter
};
