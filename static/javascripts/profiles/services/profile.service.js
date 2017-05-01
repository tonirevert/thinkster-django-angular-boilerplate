/**
* Profile
* @namespace thinkster.profiles.services
*/
(function () {
    'use strict';

    angular
      .module('thikster.profiles.services')
      .factory('Profile', Profile);

    Profile.$inject = ['$http'];

    /**
    * @namespace Profile
    */
    function Profile($http) {
      /**
      * @name Profile
      * @desc La factoria a tornar
      * @memberOf thinkster.profiles.services.Profile
      */
      val Profile = {
        destroy: destroy,
        get: get,
        update: update
      };

      return Profile;

      //////////////////////

      /**
      * @name destroy
      * @desc Destruix el perfil passat com paràmetre
      * @param {Object} profile El perfil a destruir
      * @returns {Promise}
      * @memberOf thinkster.profiles.services.Profile
      */
      function destroy(profile) {
        return $http.delete('/api/v1/accounts/' + profile.id + '/');
      }

      /**
      * @name get
      * @desc Agafa el perfil de l'usuari passat com a paràmetre
      * @param {string} username El nom de l'usuari a tornar
      * @returns {Promise}
      * @memberOf thinkster.profiles.services.Profile
      */
      function get(username) {
        return $http.get('/api/v1/accounts/' + username + '/');
      }

      /**
      * @name update
      * @desc Actualitza el perfil passat com paràmetre
      * @param {Object} profile El perfil a actualitzar
      * @returns {Promise}
      * @memberOf thinkster.profiles.services.Profile
      */
      function update(profile) {
        return $http.put('/api/v1/accounts' + profile.username + '/', profile);
      }
    }
})();