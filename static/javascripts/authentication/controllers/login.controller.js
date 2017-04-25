/**
* LoginController
* @namespace thinkster.authentication.controllers
*/
(function () {
	'use strict';

	angular
		.module('thinkster.authentication.controllers')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', '$scope', 'Authentication'];

	/**
	* @namespace LoginController
	*/
	function LoginController($location, $scope, Authentication) {
		var vm = this;

		vm.login = login;

		activate();

		/**
		* @name activate
		* @desc Accions a realitzar quan aquest controller és inicialitzat
		* @memberOf thinkster.authentication.controllers.Logincontroller
		*/
		function activate() {
			// Si l'usuari ja ha accedit no deu estar ací i és redirigit a l'arrel
			if (Authentication.isAuthenticated()) {
				$location.url('/');
			}
		}

		/**
		* @name Login
		* @dec Log in de l'usuari
		* @memberOf thinkster.authentication.controllers.LoginController
		*/
		function login() {
			Authentication.login(vm.email, vm.password);
		}
	}
})();