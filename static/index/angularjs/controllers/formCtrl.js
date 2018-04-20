app.controller('formCtrl', function($scope, $http, $location, $routeParams, dataServices, AppDataState, $window) {
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
  $scope.openPreview = openPreview;
  $scope.obtainTemplateObject;

  function submitForm() {
    if($scope.formContent.slug === "" || $scope.formContent.name === "" ) {
      $window.alert("Missing Slug/ Name");
      return;
    }
    dataServices.createLandingPage($scope.formContent)
    .then(function(res) {
      if(res.status === 200 && res.data.errors === false) {
        AppDataState.service.flash = true;
        $location.path('/');
      } else if (res.status === 200 && res.data.errors === "Duplicate") {
        console.warn("Duplicate slug")
        $window.alert("Duplicate Slug")
      }
    }).catch(function(err) {
        console.warn("Server Error");
        $window.alert("Server Error");
    });
  }

  function openPreview() {
    $window.open("/", "popup", "width=1000,height=1000,left=1000,top=150");
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
        bottomNavItem2:"",
        bottomNavItem3:"",

      }
    }
    break;
    case "template3":
    return {
      header:{
        navbarbrand:"",
        navItem1:"",
        navItem2:"",
        header1:"",
        header2:"",

      },
      quicklink1:{
        header:"",
        paragraph:""
      },
      quicklink2:{
        header:"",
        paragraph:""
      },
      quicklink3:{
        header:"",
        paragraph:""
      },
      footer:{
        copyRight:""
      }

    }
  }
}
