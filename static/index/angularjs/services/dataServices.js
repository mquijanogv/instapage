app.factory("dataServices", function($http){
    return {
        getLandingPages: function() {
          return $http.get("api/v1/landing-pages");
        },
        createLandingPage: function(formContent) {
          return $http.post("api/v1/landing-pages", formContent)
        }
    };
});
