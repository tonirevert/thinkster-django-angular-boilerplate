/**
* PostController
* @namespace thinkster.posts.controllers
*/
(function () {
	'use strict';

	angular
	  .module('thinkster.posts.controllers')
	  .controller('PostsController', PostsController);

	PostsController.$inject = ['$scope'];

	/**
	* @namespace PostsController
	*/
	function PostsController($scope) {
		var vm = this;

		vm.colums = [];

		activate();

		/**
		* @name activate
		* @desc Accions a dur a terme quan aquest controller es inicialitzat
		* @memberOf thinkster.controllers.PostsController
		*/
		function activate() {
			$scope.$watchCollection(function () {
				return $scope.posts;
			}, render);
			$scope.watch(function () {
				return $(window).width();
			}, render);
		}

		/**
		* @name calculateNumberOfColumns
		* @desc Calcula el nombre de columnes en funció del ample de la pantalla
		* @returns {Number} El nombre de columnes que contingen Posts
		* @memberOf thinkster.posts.controllers.PostsControllers
		*/
		function calculateNumberOfColumns() {
			var width = $(window).width();

			if (width >= 1200) {
				return 4;
			} else if (width >= 992) {
				return 3;
			} else if (width >= 768) {
				return 2;
			} else {
				return 1;
			}
		}

		/**
		* @name approximateShortestColumn
		* @desc Algoritme per aproximar quina columna és més curta
		* @returns El index de la columna més curta
		* @memberOf thinkster.posts.controllers.PostsController
		*/
		function approximateShortestColumn() {
			var scores = vm.columns.map(columnMapFn);

			return scores.indexOf(Math.min.apply(this, scores));
		}

		/**
		* @name columnMapFn
		* @desc Funció per a mapejar les altures de les columnes
		* @returns La altura normalitzada aproximada de una columna
		*/
		function columnMapFn(column) {
			var lengths = column.map(function (element) {
				return element.content.length;
			});

			return lengths.reduce(sum, 0) * column.length;
		}

		/**
		* @name sum
		* @desc Suma dos nombres
		* @params {Number} m El primer nombre a sumar
		* @params {Number} n El segon nombre a sumar
		* @returns La suma dels dos nombres
		*/
		function sum(m, n) {
			return m + n;
		}

		/**
		* @name render
		* @desc Renderitza els Posts amb una altura aproximadament igual
		* @param {Array} current El valor actual de `vm.posts`
		* @param {Array} original El valor de `vm.posts` abans d'actualitzar
		* @memberOf thinkster.posts.controllers.PostsController
		*/
		function render(current, original) {
			if (current !== original) {
				vm.columns = [];

				for (var i = 0; i < calculateNumberOfColumns(); ++i) {
					vm.columns.push([]);
				}

				for (var i = 0; i < current.length; ++i) {
					var column = approximateShortestColumn();

					vm.columns[column].push(current[i]);
				}
			}
		}
	}
})();