const express = require('express');
const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');

module.exports = class ServerApp {

  constructor() {
  // External Dependices will be initialized here
  }

  start() {

      this.app = express();

      this.app.use(bodyParser.json()); // for parsing application/json
      this.app.engine('html', es6Renderer);
      this.app.set('views','server/views');
      this.app.set('view engine', 'html');
      this.app.use(express.static('static'))

      this._configRoute();
      // TODO: port will based on config file
      const port = 3001;

      return this.app.listen(port, () => {
          console.log("Server is running on 3000");
      });
  }

  _configRoute() {

    const handlers = {
      health: require('./controllers/healthCtrl'),
      instapage: require('./controllers/instapageCtrl')
    };

    this.app.get('/', handlers.instapage.home);

    this.app.get('/ping', handlers.health.pong);
    this.app.get('/health', handlers.health.healthCheck);
  }
}
