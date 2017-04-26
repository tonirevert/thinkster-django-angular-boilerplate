/**
* Posts
* @namespace thinkster.posts.services
*/
(function () {
	'use strict';

	angular
	  .module('thinkster.posts.services')
	  .factory('Posts', Posts);

	Posts.$inject = ['$http'];

	/**
	* @namespace Posts
	* @returns {Factory}
	*/
	function Posts($http) {
		var Posts = {
			all: all,
			create: create,
			get: get
		};

		return Posts;

		//////////////////

		/**
		* @name all
		* @desc Agafa tots els posts
		* @returns {Promise}
		* @memberOf thinkster.posts.services.Posts
		*/
		function all() {
			return $http.get('/api/v1/posts/');
		}

		/**
		* @name create
		* @desc Crea un nou post
		* @param {string} content El contingut del nou Post
		* @returns {Promise}
		* @memberOf thinkster.posts.service.Posts
		*/
		function create(content) {
			return $http.post('/api/v1/posts/', {
				content: content
			});
		}

		/**
		* @name get
		* @desc Agafa els Posts d'un usuari concret
		* @param {string} username El usuari dels Posts a cercar
		* @returns {Promise}
		* @memberOf thinkster.posts.services.Posts
		*/
		function get(username) {
			return $http.get('/api/v1/accounts/' + username + '/posts/');
		}
	}
})();