app.controller('formCtrl', function($scope, $http, $location, $routeParams, dataServices) {
  console.log($routeParams.id)
  var basicTemplateInfo = {
    name:"",
    slug:"",
    template:$routeParams.id
  }
  $scope.formContent = Object.assign(basicTemplateInfo,obtainTemplateObject($routeParams.id));
  $scope.template = $routeParams.id;
  console.log($scope.formContent)
  $scope.submitForm = submitForm;
  $scope.obtainTemplateObject;

  function submitForm() {
    dataServices.createLandingPage($scope.formContent)
    .then(function(res) {
      console.log(res)
    })
  }
});

function obtainTemplateObject(template) {
  switch(template) {
    case "template1":
      return {
        content: {
          header1:"",
          paragraph:"",
          button:"",
        }
      }
      break;
    case "template2":
    return {
      section1: {
        navbarbrand:"",
        navlink1:"",
        navlink2:"",
        navlink3:"",
        paragraph:"",
        button:""
      },
      section2: {
        header:"",
        paragraph:""
      },
      section3: {
        header:"",
        button:""
      },
      footer: {
        copyRight:"",
        bottomNavItem1:"",
        ottomNavItem2:"",
        ottomNavItem3:"",

      }
    }
  }
}
