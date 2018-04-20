// instapage controller
const dao = require('../models/dao/landingPageDao');

// Render angular app
function home (req, res) {
  res.render('index');
}
// Obtain all landing pages
function getAllLandingPages(db) {
  return (request, response) => {
    dao.getAllLandingPages(db)
    .then((docs) => {
      response.status(200).json(docs);
    }).catch((err) => {
      console.log(err);
    })
  }
}

// Insert a new landing page
function createLandingPage(db) {
  return (request, response) => {
    // Set number of visits to 0
    request.body.visits=0;
    dao.insertLandingPage(db,request.body)
    .then((res) => {
      res.errors = false;
      response.status(200).json(res);
    }).catch((err) => {
      if(err.errors == "Duplicate") {
        response.status(200).json(err)
      }
      response.status(500).json(err);
      console.log(err)
    })
  }
}
// Render a specific landing page
function showLandingPage(db) {
  return (request, response) => {
    dao.incrementVisitCounter(db, request.params.slug)
    .then((res) => {
      dao.findLandingPage(db, request.params.slug)
      .then((res) => {
        response.render(res[0].template,{locals: {res: res}});
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    });
  }
}

// update slug of a specific landing page
function updateSlug(db) {
  return (request, response) => {
    dao.updateSlug(db, request.params.id, request.query.newSlug )
    .then((res) => {
      response.status(200).json();
    }).catch((err) => {
      console.log(err)
    });

  }

}

module.exports = {
    home:home,
    getAllLandingPages: getAllLandingPages,
    createLandingPage: createLandingPage,
    showLandingPage: showLandingPage,
    updateSlug:updateSlug
};
