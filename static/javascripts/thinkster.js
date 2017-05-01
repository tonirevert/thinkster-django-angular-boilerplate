(function () {
  'use strict';

  angular
    .module('thinkster', [
      'thinkster.routes',
      'thinkster.authentication',
      'thinkster.config',
      'thinkster.layout',
      'thinkster.posts',
      'thinkster.utils'
    ]);

  angular
    .module('thinkster.config', []);

  angular
    .module('thinkster.routes', ['ngRoute']);


  /*Codi per a donar suport al CSRF token de django:*/
  angular
    .module('thinkster')
    .run(run);

  run.$inject = ['$http'];

  /**
  * @name run
  * @desc Update xsrf $http headers to align with Django's defaults
  */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }

})();