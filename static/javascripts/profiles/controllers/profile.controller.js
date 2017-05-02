/**
* ProfileController
* @namespace thinkster.profiles.controllers
*/
(function () {
    'use strict';

    angular
      .module('thinkster.profiles.controllers')
      .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$location', '$routeParams', 'Posts', 'Profile', 'Snackbar'];

    /**
    * @namespace ProfileController
    */
    function ProfileController($location, $routeParams, Posts, Profile, Snackbar) {
        var vm = this;

        vm.profile = undefined;
        vm.posts = [];

        activate();

        /**
        * @name activate
        * @desc Accions a dur a terme quan aquest controlador siga instanciat
        * @memberOf thinkster.profiles.controllers.ProfileController
        */
        function activate() {
            var username = $routeParams.username.substr(1);

            Profile.get(username).then(profileSuccessFn, profileErrorFn);
            Posts.get(username).then(postsSuccessFn, postsErrorFn);

            /**
            * @name profileSuccessFn
            * @dessc Actualitza el 'profile' al viewmodel
            */
            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
            }

            /**
            * @name profileErrorFn
            * @desc Redirigeix al index i mostra un Snackbar d'error
            */
            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                console.log('profileErrorFn a profile.controller.js');
                Snackbar.error('Eixe usuari no existeix.');
            }

            /**
            * @name postSuccessFn
            * @desc Actualitza 'posts' al viewmodel
            */
            function postsSuccessFn(data, status, headers, config) {
                vm.posts = data.data;
            }

            /**
            * @name postsErrorFn
            * @desc Mostra un Snackbar d'error
            */
            function postsErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.error);
            }
        }
    }
})();