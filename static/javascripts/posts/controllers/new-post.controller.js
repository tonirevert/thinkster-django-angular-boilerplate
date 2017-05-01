/**
* NewPostController
* @namespace thinkster.posts.controllers
*/
(function () {
    'use strict';

    angular
      .module('thinkster.posts.controllers')
      .controller('NewPostController', NewPostController);

    NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts'];

    /**
    * @namespace NewPostController
    */
    function NewPostController($rootScope, $scope, Authentication, Snackbar, Posts) {
        var vm = this;

        vm.submit = submit;

        /**
        * @name submit
        * @desc Crea un nou post
        * @memberOf thinkster.posts.controllers.NewPostController
        */
        function submit() {
            $rootScope.$broadcast('post.created', {
                content: vm.content,
                    author: {
                      username: Authentication.getAuthenticatedAccount().username
                    }
                });

            $scope.closeThisDialog();

            Posts.create(vm.content).then(createPostSuccessFn, createPostErrorFn);

            /**
            * @name createPostSuccessFn
            * @desc Mostra un snackbar amb el missatge de nou post creat
            */
            function createPostSuccessFn(data, status, headers, config) {
                Snackbar.show('Nou post creat!');
            }

            /**
            * @name createPostErrorFn
            * @desc Propaga l'event d'error i mostra un snackbar amb missatge d'error
            */
            function createPostErrorFn(data, status, headers, config) {
                $rootScope.$broadcast('post.created.error');
                Snackbar.error(data.error);
            }
        }
    }

})();