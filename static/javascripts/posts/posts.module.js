(function () {
	'use strict';

	angular
	  .module('thinkster.posts', [
	  	'thinkster.posts.controllers',
	  	'thinkster.posts.directives',
	  	'thinkster.posts.services'
	  ]);

	angular
	  .module('thinkster.posts.controllers', []);

	angular
	  .module('thinkster.posts.directives', ['ngDialog']);//ngDialog és per a poder treballar amb modals

	angular
	  .module('thinkster.posts.services', []);
})();