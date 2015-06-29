/**
 * Created by Matias-note on 27/06/2015.
 */

(function () {

    var aplicacion = angular.module('einicio', ['ui.router']);


    aplicacion.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('paginicio', {
                url: "/",
                templateUrl: "e_inicio.html"
            })

            .state('paginicio.lista', {
                url: "list",
                templateUrl: "e_inicio.lista.html",
                controller: function ($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                }
            })

            .state('productos', {
                url: "/productos",
                templateUrl: "e_productos.html",
                /* controller: function ($scope,$http) {


                    $http.get('productos.json').success(function (respuesta) {

                    $scope.productos=respuesta;
                    }

                    );

                }
                    */
            })


    });

    aplicacion.controller('navCtrl', ['$location', function ($location) {


        this.selected = function (loc) {

            var ruta = $location.path();

            if (ruta == loc) {
                return true;
            } else {

                return false;

            }


        };


    }]);



    aplicacion.factory('datosJson', function($http){

    var retornar = {};



        $http.get('productos.json').success(function (respuesta) {

            retornar=respuesta;


        });


    return retornar;



    });



    aplicacion.directive('miDirectiva',['datosJson', function(datosJason) {
        return {




        }
    }]);


    aplicacion.controller('pruebaCtrl', ['$http', function ($http) {


        $http.get('productos.json').success(function (respuesta) {



        });


    }]);


    aplicacion.controller('productosCtrl', function () {


    });


    /* aplicacion.directive('inicio-principal')


     */
})();
