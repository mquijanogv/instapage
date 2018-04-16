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
  }).when("/templateselection", {
    templateUrl: "index/templateSelection.html",
    controller: 'templateSelectionCtrl as templateSelectionCtrl'
  }).when("/newLandingPage/:id", {
    templateUrl: "index/createNewLandingPage.html",
    controller: "formCtrl as formCtrl"
  })
})

.controller('mainCtrl', function ($scope, $http, landingPages, $location) {
  $scope.landingPages = {};
  $scope.landingpages = landingPages.data;
  $scope.newLandingPage = newLandingPage;
  $scope.hasContent = hasContent;

  function newLandingPage(templateId) {
    $location.path('/templateselection/')
  }

  function hasContent() {
    return true;
  }
})

.controller('templateSelectionCtrl', function ($scope, $http, $location) {
  $scope.template = {
    version:""
  }
  $scope.goToForm = goToForm;

  function goToForm(templateVersion) {
    $location.path('/newLandingPage/'+templateVersion);
  }
})

.controller('formCtrl', function($scope, $http, $location, $routeParams, dataServices) {
  console.log($routeParams.id)
  $scope.template = $routeParams.id
  $scope.formContent = {
    name:"",
    slug:"",
    template:$routeParams.id,
    content: {
      header1:"",
      paragraph:"",
      buttonText:"",
    }
  }
  $scope.submitForm = submitForm;

  function submitForm() {
    // if ($scope.formContent.name === '') {
    //   window.alert("Error")
    // }
    dataServices.createLandingPage($scope.formContent)
    .then(function(res) {
      console.log(res)
    })
  }
})


app.factory("dataServices", function($q, $http){
    return {
        getLandingPages: function() {
          return $http.get("api/v1/landing-pages");
        },
        createLandingPage: function(formContent) {
          return $http.post("api/v1/landing-pages", formContent)
        }
    };
});

angular.element(function() {
angular.bootstrap(document, ['myApp']);
});
