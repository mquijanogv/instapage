app.controller('formCtrl', function($scope, $http, $location, $routeParams, dataServices, AppDataState) {
  var basicTemplateInfo = {
    name:"",
    slug:"",
    template:$routeParams.id
  }
  $scope.formContent = Object.assign(basicTemplateInfo,obtainTemplateObject($routeParams.id));
  $scope.template = $routeParams.id;
  $scope.errors = false;
  $scope.errorList = [];
  $scope.submitForm = submitForm;
  $scope.obtainTemplateObject;

  function submitForm() {
    dataServices.createLandingPage($scope.formContent)
    .then(function(res) {
      if(res.status === 200 && res.data.errors === false) {
        AppDataState.service.flash = true;
        $location.path('/');
      } else if (res.status === 200 && res.data.errors === "Duplicate") {
        console.warn("Duplicate slug")
        window.alert("Duplicate Slug")
      }
    }).catch(function(err) {
        console.warn("Server Error");
        window.alert("Server Error");
    });
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
      header: {
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
        bottomNavItem3:"",

      }
    }
  }
}
