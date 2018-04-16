var app = angular.module('myApp', ["ngRoute"]);

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
  })

})

.controller('mainCtrl', function ($scope, $http, landingPages) {

  $scope.landingPages = {};

  $scope.landingpages = landingPages.data;
});


app.factory("dataServices", function($q, $http){
    return {
        getLandingPages: function(){
            return $http.get("api/v1/landing-pages");
        }
    };
});

angular.element(function() {
angular.bootstrap(document, ['myApp']);
});
