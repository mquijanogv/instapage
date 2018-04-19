app.factory("AppDataState", function($http) {
  return {
      service: {
        flash:false
      },
      getDataState: function() {
        return this.service;
      }
  }
});
