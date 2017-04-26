/**
* Posts
* @namespace thinkster.posts.directives
*/
(function () {
	'use strict';

	angular
	  .module('thinkster.posts.directives')
	  .directive('posts', posts);

	/**
	* @namespace Posts
	*/
	function posts() {
		/**
		* @name directive
		* @desc La directiva a tornar
		* @memberOf thinkster.posts.directives.Posts
		*/
		var directive = {
			controller: 'PostController',
			controllerAs: 'vm',
			restrict: 'E',//Per a restringir a l'element <posts></posts>
			scope: {
				posts: '='
			},
			templateUrl: '/static/templates/posts/post.html'
		};

		return directive;
	}
})();