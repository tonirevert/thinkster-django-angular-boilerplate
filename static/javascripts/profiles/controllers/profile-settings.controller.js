/**
* ProfileSettingsController
* @namespace thinkster.profile.controllers
*/
(function () {
    'use strict';

    angular
      .module('thinkster.profiles.controllers')
      .controller('ProfileSettingsController', ProfileSettingsController);

      ProfileSettingsController.$inject = [ '$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar'];

      /**
      * @namespace ProfileSettingsController
      */
      function ProfileSettingsController($location, $routeParams, Authentication, Profile, Snackbar) {
        var vm = this;

        vm.destroy = destroy;
        vm.update = update;

        activate();

        /**
        * @name activate
        * @desc Accions a dur a terme cada cop que aquest controlador és instanciat.
        * @memberOf thinkster.controllers.ProfileSettingsController
        */
        function activate() {
            var authenticatedAccount = Authentication.getAuthenticatedAccount();
            var username = $routeParams.username.substr(1);

            //Redirigeix si no està logegat.
            if (!authenticatedAccount) {
                $location.url('/');
                Snackbar.error('No estàs autoritzat per a visualitzar aquesta pàgina.');
            } else {
                //Redirigeix si està logegat, però no és el propietari d'aquest perfil.
                if (authenticatedAccount.username !== username) {
                    $location.url('/');
                    Snackbar.error('No estàs autoritzat per a visualitzar aquesta pàgina.');
                }
            }

            Profile.get(username).then(profileSuccessFn, profileErrorFn);

            /**
            * @name profileSuccessFn
            * @desc Actualitza el 'profile' per a la vista
            */
            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
            }

            /**
            * @name profileErrorFn
            * @desc Redirigeix al index
            */
            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                console.log('Error profileErrorFn');
                Snackbar.error('Eixe usuari no existeix.');
            }
        }

        /**
        * @name destroy
        * @desc Destruix el perfil d'usuari
        * @memberOf thinkster.profiles.controllers.ProfileSettingsController
        */
        function destroy() {
            console.log(vm.profile.username);
            Profile.destroy(vm.profile.username).then(profileSuccessFn, profileErrorFn);

            /**
            * @name profileSuccessFn
            * @desc Redirigeix al index i mostra un Snackbar de fet
            */
            function profileSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();
                window.location = '/';

                Snackbar.show('El teu compte ha sigut borrat.');
            }

            /**
            * @name profileErrorFn
            * @desc Mostra un Snackbar d'error
            */
            function profileErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }

        /**
        * @name update
        * @desc Actualitza el perfil de l'usuari
        * @memberOf thinkster.profiles.controllers.ProfileSettingsController
        */
        function update() {
            Profile.update(vm.profile).then(profileSuccessFn, profileErrorFn);


            /**
            * @name profileSuccessFn
            * @desc Mostra un Snackbar de que ha anat ok
            */
            function profileSuccessFn(data, status, headers, config) {
                Snackbar.show('El teu perfil ha sigut actualitzat.');
            }

            /**
            * @name profileErrorFn
            * @desc Mostra un Snackbar d'error
            */
            function profileErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
      }
})();