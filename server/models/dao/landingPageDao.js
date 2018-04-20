const COLLECTION = 'landingpages';

// Obtain all landing pages from the DB
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

// Insert a landing page to the DB
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

// Check for duplicate slugs
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

// Find a landing page in the DB
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

// Increment Visit counter in the DB
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

// Update specific slug in the DB
function updateSlug(db, id, slug) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(COLLECTION);
    collection.updateOne({ slug : id  }
    , { $set: { slug : slug } }, function(err, result) {
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
    incrementVisitCounter: incrementVisitCounter,
    updateSlug: updateSlug
};
