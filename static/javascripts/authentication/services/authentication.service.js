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
      });
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
      });
    }
  }
})();