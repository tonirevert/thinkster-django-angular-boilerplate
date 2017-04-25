/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http) {
    /**
    * @name Authentication
    * @desc La Factoria a tornar
    */
    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
      register: register,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate

    };

    return Authentication;

    /**
     * @name getAuthenticatedAccount
     * @desc Torna el compte de l'usuari autenticat
     * @returns {object|undefined} El compte si esta autenticat, si no `undefined`.
     * @memberOf thinkster.authentication.services.Authentication
     */
    function getAuthenticatedAccount() {
      if (!$cookies.authenticatedAccount) {
        return;
      }

      return JSON.parse($cookies.authenticatedAccount);
    }

    /**
     * @name isAuthenticated
     * @desc Comprova si l'usuari actual esta autenticat
     * @returns {boolean} True si l'usuari esta autenticat, o false si no.
     * @memberOf thinkster.authentication.services.Authentication
     */
    function isAuthenticated() {
      return !!$cookies.authenticatedAccount;
    }

    /**
     * @name setAuthenticatedAccount
     * @desc Fa un Stringify del compte i el guarda a una cookie.
     * @param {Object} user Objecte compte a guardar.
     * @returns {undefined}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function setAuthenticatedAccount(account) {
      $cookies.authenticatedAccount = JSON.stringify(account);
    }

    /**
     * @name unauthenticate
     * @desc Borra la cookie on es guarda l'usuari.
     * @returns {undefined}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function unauthenticate() {
      delete $cookies.authenticatedAccount;
    }
    ////////////////////

    /**
    * @name register
    * @desc Prova a registrar un nou usuari.
    * @param {string} username El username escrit per l'usuari.
    * @param {string} password El password escrit per l'usuari.
    * @param {string} email El email escrit per l'usuari.
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      }).then(registerSuccessFn, registerErrorFn);


      /**
      * @name registerSuccessFn
      * @desc Fa login del nou usuari
      */
      function registerSuccessFn(data, status, headers, config){
        Authentication.login(email, password);
      }


      /**
      * @name registerErrorFn
      * @desc Escriu un log "Error epic!" a la consola
      */
      function registerErrorFn(data, status, headers, config) {
        console.error('Error epic!');
      }

    }

    /**
     * @name login
     * @desc Prova a fer log in amb `email` i `password`
     * @param {string} email El email escrit per l'usuari.
     * @param {string} password El password escrit per l'usuari.
     * @returns {Promise}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function login(email, password) {

      return $http.post('/api/v1/auth/login/', {
        email: email,
        password: password
      }).then(loginSuccessFn, loginErrorFn);

      /**
       * @name loginSuccessFn
       * @desc Guarda el compte a cookie i redirecciona al index
       */
      function loginSuccessFn(data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);

        window.location = '/';
      }

      /**
       * @name loginErrorFn
       * @desc Escriu un log "Error epic!" a la consola
       */
      function loginErrorFn(data, status, headers, config) {
        console.error('Error epic!');
      }
    }

    /**
    * @name logout
    * @desc Intena fer un logout de l'usuari
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

      /**
       * @name logoutSuccessFn
       * @desc Unautentica i redirecciona al index amb un reload
       */
      function logoutSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();

        window.location = '/';
      }

      /**
       * @name logoutErrorFn
       * @desc Escriu un log "Error epic!" a la consola
       */
      function logoutErrorFn(data, status, headers, config) {
        console.error('Error epic!');
      }
    }
  }
})();