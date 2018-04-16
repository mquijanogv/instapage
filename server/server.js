const express = require('express');
const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');

module.exports = class ServerApp {

  constructor() {
  // External Dependices will be initialized here
  this.db = null;
  }

  start(db) {

      this.app = express();

      this.app.use(bodyParser.json()); // for parsing application/json
      this.app.engine('html', es6Renderer);
      this.app.set('views','server/views');
      this.app.set('view engine', 'html');
      this.app.use(express.static('static'))

      this.db = db;

      this._configRoute(this.db);
      // TODO: port will based on config file
      const port = 3001;

      return this.app.listen(port, () => {
          console.log("Server is running on 3001");
      });
  }

  _configRoute(db) {

    const handlers = {
      health: require('./controllers/healthCtrl'),
      instapage: require('./controllers/instapageCtrl')
    };

    this.app.get('/', handlers.instapage.home);
    this.app.get('/api/v1/landing-pages/', handlers.instapage.getAllLandingPages(db));
    this.app.post('/api/v1/landing-pages/', handlers.instapage.createLandingPage(db));
    this.app.get('/pages/:slug', handlers.instapage.showLandingPage(db));

    this.app.get('/ping', handlers.health.pong);
    this.app.get('/health', handlers.health.healthCheck);
  }
}
