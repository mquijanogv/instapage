const dao = require('../models/dao/landingPageDao');

function home (req, res) {
  res.render('index');
}
// Obtain all landing pages
function getAllLandingPages(db) {
  return (req, res) => {
    dao.getAllLandingPages(db)
    .then((docs) => {
      res.status(200).json(docs);
    }).catch((err) => {
      console.log(err);
    })
  }
}

// Insert a new landing page
function createLandingPage(db) {
  return (req, res) => {
    dao.insertLandingPage(db,req.body)
    .then((res) => {
      console.log(res.result)
    }).catch((err) => {
      console.log(err)
    })
  }
}

module.exports = {
    home:home,
    getAllLandingPages: getAllLandingPages,
    createLandingPage: createLandingPage
};
