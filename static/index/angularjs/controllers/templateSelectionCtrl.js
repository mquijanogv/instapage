app.controller('templateSelectionCtrl', function ($scope, $http, $location) {
  $scope.template = {
    version:""
  }
  $scope.goToForm = goToForm;

  function goToForm(templateVersion) {
    $location.path('/newLandingPage/'+templateVersion);
  }
})
