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
    function ProfileController($location, $touteParams, Posts, Profile, Snackbar) {
        var vm = this;

        vm.profile = undefined;
        vm.posts = [];

        activate();
    }
})();