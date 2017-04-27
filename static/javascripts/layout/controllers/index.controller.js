/**
* IndexController
* @namespace thinkster.layout.controllers
*/
(function () {
	'use strict';

	angular
	  .module('thinkster.layout.controllers')
	  .controller('IndexController', IndexController);

	IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

	/**
	* @namespace IndexController
	*/
	function IndexController($scope, Authentication, Posts, Snackbar) {
		var vm = this;

		vm.isAuthenticated = Authentication.isAuthenticated();
		vm.posts = [];

		activate();

		/**
		* @name activate
		* @desc Accions a dur a terme qua incialitza aquest controller
		* @memberOf thinkster.layout.controllers.IndexController
		*/
		function activate() {
			Posts.all().then(postsSuccessFn, postsErrorFn);

			$scope.$on('post.created', function (event, post) {
				vm.posts.shift(post);
			});

			$scope.$on('post.created.error', function () {
				vm.posts.shift();
			});

			/**
			* @name postSuccessFn
			* @desc Actualitza el array de la vista
			*/
			function postsSuccessFn(data, status, headers, config) {
				vm.posts = data.data;
			}

			/**
			* @name ostsErrorFn
			* @desc Mostra un snackbar amb error
			*/
			function postsErrorFn(data, status, headers, config) {
				Snackbar.error(data.error);
			}
		}
	}

})();