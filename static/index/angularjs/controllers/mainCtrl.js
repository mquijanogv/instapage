app.controller('mainCtrl', function ($scope, $http, landingPages, $location) {
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
