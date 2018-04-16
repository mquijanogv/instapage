const dao = require('../models/dao/landingPageDao');

function home (req, res) {
  res.render('index');
}

// Obtain all landing pages
function getAllLandingPages (db) {
  return (req, res) => {
    dao.getAllLandingPages(db)
    .then((docs) => {
      res.status(200).json(docs);
    }).catch((err) => {
      console.log(err);
    })
  }
}

module.exports = {
    home:home,
    getAllLandingPages: getAllLandingPages
};
