const dao = require('../models/dao/landingPageDao');

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
      console.log(res.result)
    }).catch((err) => {
      console.log(err)
    })
  }
}

function showLandingPage(db) {
  return (request, response) => {
    dao.incrementVisitCounter(db, request.params.slug)
    .then((res) => {
      dao.findLandingPage(db, request.params.slug)
      .then((res) => {
        console.log(res[0].content)
        response.render(res[0].template,{locals: {res: res}});
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    });
  }
}

module.exports = {
    home:home,
    getAllLandingPages: getAllLandingPages,
    createLandingPage: createLandingPage,
    showLandingPage: showLandingPage
};
