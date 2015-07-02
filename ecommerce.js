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


    aplicacion.factory('datosJson', ['$http', function ($http) {

        var listadoT = [];
        var retornar = {
            listadoTotal: function (callback) {

                $http.get('productos.json').success(function (respuesta) {

                    listadoT = respuesta;
                    callback(respuesta);

                });

            },

            listadoCategorias: function () {

                var listadotot = listadoT.map(function (item) {
                    return item.categoria;

                });

                listadotot = listadotot.filter(function (a, b, c) {
                    return c.indexOf(a, b + 1) < 0;
                });

                listadotot = listadotot.sort();

                for (i = 0; listadotot.length > i; i++) {
                    listadotot[i] = {cat: listadotot[i], id: "cat" + (i + 1)}
                }

                return listadotot;

            },


            /*  listadoFiltro: function (categoria) {


             var listadoFiltro = listadoT.filter(function (item) {

             return (item.categoria == categoria);


             });

             return listadoFiltro;
             }

             */
        }
        return retornar;

    }]);


    aplicacion.directive('misCategorias', ['datosJson', function (datosJson) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'listadoCategorias.html',

            link: function (scope) {

                datosJson.listadoTotal(function (resp) {

                    scope.categorias = datosJson.listadoCategorias();

                    console.log(datosJson.listadoCategorias());

                    //console.log(datosJson.listadoFiltro('cat01'));

                });

            },

            controller: function ($scope) {

                if ($scope.cat == true) {
                    alert("holaaaaa");
                }

            }

        }
    }]);


    aplicacion.directive('misProductos', ['datosJson', function (datosJson) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'listadoProductos.html',

            link: function (scope) {

                datosJson.listadoTotal(function (resp) {

                    scope.productos = resp;

                    //console.log(datosJson.listadoCategorias());
                    //console.log(datosJson.listadoFiltro('cat01'));

                });

            },
            controller: function ($scope) {
                $scope.listadoFiltrado = function () {

                }

            }

        }
    }]);


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
