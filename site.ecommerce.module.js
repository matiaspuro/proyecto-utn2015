(function () {

    var aplicacion = angular.module('einicio', ['ui.router']);


    aplicacion.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");


        $stateProvider
            .state('paginicio', {
                url: "/",
                templateUrl: "e_inicio.html"
            })


            .state('productos', {
                abstract:true,
                template:"<ui-view/>",
                controller: function ($scope) {

                   $scope.p1='holaaaaaaaaaaaa';

                }


            })


            .state('productos.all', {

                url: "/all",
                templateUrl: "e_productos.html",


            })


            .state('productos.detalle', {

            url:"/detalle/:prod",
            templateUrl:"prueba2.html",
            controller: function($scope,$stateParams){


                $scope.prod=$stateParams.prod;

                console.log($scope.p1);


            }


            })

    });


    aplicacion.controller('pruebaCtrl', ['$http', function ($http) {

        $http.get('productos.json').success(function (respuesta) {

        });

    }]);


    aplicacion.controller('productosCtrl', function () {

    });

    aplicacion.directive('miInicio', ['datosJson', function (datosJson) {
        return {
            restrict: "E",
            transclude: true,
            template: "<div ng-transclude=''></div>",

            controller: function ($scope) {

                datosJson.listadoTotal(function (resp) {

                    $scope.categorias = datosJson.listadoCategorias();
                    console.log(datosJson.listadoCategorias());
                    //console.log(datosJson.listadoFiltro('cat01'));
                    $scope.variablePrueba = "hola";

                });

            }

        }

    }]);


    aplicacion.controller('controladorPrincipal', function ($scope) {

    });


    aplicacion.directive('directivaInicio', function () {

        return {

            restrict: "E",
            scope: {
                item: "=",
                lista: "="
            },

            templateUrl: "inicio_prueba.html",
            controller: function ($scope) {
                $scope.variable1 = "otraa cosaaaa"

            }

        }

    });


    /* aplicacion.directive('inicio-principal')


     */


})

();
