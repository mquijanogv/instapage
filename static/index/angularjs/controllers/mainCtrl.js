app.controller('mainCtrl', function ($scope, $http, landingPages, $location, AppDataState, $timeout, dataServices, $window) {
  $scope.landingPages = {};
  $scope.landingpages = landingPages.data;
  $scope.newLandingPage = newLandingPage;
  $scope.hasContent = hasContent;
  $scope.flash = AppDataState.service.flash;
  $scope.updateSlug = updateSlug;

  if($scope.flash) {
    $timeout( function(){
           AppDataState.service.flash = false;
           $scope.flash = AppDataState.service.flash;
       }, 5000 );
  }

  function updateSlug(oldSlug) {
    var newSlug = $window.prompt("New Slug:")
    dataServices.updateSlug(newSlug, oldSlug)
    .then(function () {
      $location.path('/');
    }).catch(function() {

    });
  }



  function newLandingPage(templateId) {
    $location.path('/templateselection/')
  }

  function hasContent() {
    return true;
  }
})
