app.controller('mainCtrl', function ($scope, $http, landingPages, $location, AppDataState, $timeout) {
  $scope.landingPages = {};
  $scope.landingpages = landingPages.data;
  $scope.newLandingPage = newLandingPage;
  $scope.hasContent = hasContent;
  $scope.flash = AppDataState.service.flash;

  if($scope.flash) {
    $timeout( function(){
           AppDataState.service.flash = false;
           $scope.flash = AppDataState.service.flash;
       }, 5000 );
  }



  function newLandingPage(templateId) {
    $location.path('/templateselection/')
  }

  function hasContent() {
    return true;
  }
})
