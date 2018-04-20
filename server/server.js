const express = require('express');
const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');

module.exports = class ServerApp {

  constructor(config, db) {
  // External Dependices will be initialized here
  this.db = db;
  this.config = config;
  }

  start() {

      this.app = express();

      this.app.use(bodyParser.json()); // for parsing application/json
      this.app.engine('html', es6Renderer);
      this.app.set('views','server/views');
      this.app.set('view engine', 'html');
      this.app.use(express.static('static'))

      // this.db = db;

      this._configRoute(this.db);

      return this.app.listen(this.config.PORT, () => {
          console.log(`Server is running on port ${this.config.PORT}`);
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
    this.app.get('/pages/:slug', handlers.instapage.showLandingPage(db,es6Renderer));
    this.app.put('/api/v1/landing-pages/:id', handlers.instapage.updateSlug(db));

    this.app.get('/ping', handlers.health.pong);
    this.app.get('/health', handlers.health.healthCheck);
  }
}
