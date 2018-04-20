app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "index/main.html",
    controller: 'mainCtrl as mainCtrl',
    resolve: {
        landingPages: function(dataServices) {
          return dataServices.getLandingPages();
        }
    }
  }).when("/templateselection", {
    templateUrl: "index/templateSelection.html",
    controller: 'templateSelectionCtrl as templateSelectionCtrl'
  }).when("/newLandingPage/:id", {
    templateUrl: "index/createNewLandingPage.html",
    controller: "formCtrl as formCtrl"
  });
});
