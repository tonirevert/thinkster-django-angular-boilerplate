/**
* Snackbar
* @namespace thinkster.utils.services
*/
(function ($, _) {
	'use strict';

	angular
	  .module('thinkster.utils.services')
	  .factory('Snackbar', Snackbar);

	/**
	* @namespace Snackbar
	*/
	function Snackbar() {
		/**
		* @name Snackbar
		* @desc La factoria a tornar
		*/
		var Snackbar = {
			error: error,
			show: show
		};

		return Snackbar;

		/////////////////////

		/**
		* @name _snackbar
		* @desc Mostra un snackbar
		* @param {string} content El contingut del snackbar
		* @param {Object} options Opcions per a mostrar el snackbar
		*/
		function _snackbar(content, options) {
			options = _.extend({ timeout: 3000 }, options);
			options.content = content;

			$.snackbar(options);
		}

		/**
		* @name error
		* @desc Mostra un snackbar d'error
		* @param {string} content El contingut del snackbar
		* @param {Object} options Opcions per a mostrar el snackbar
		* @memberOf thinkster.utils.services.Snackbar
		*/
		function error(content, options) {
			_snackbar('Error ' + content, options);
		}

		/**
		* @name show
		* @desc Mostra un snackbar standard
		* @param {string} content El contingut del snackbar
		* @param {Object} options Opcions per a mostrar el snackbar
		* @memberOf thinkster.utils.services.Snackbar
		*/
		function show(content, options) {
			_snackbar(content, options);
		}
	}
})($, _);