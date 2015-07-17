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
                controller: "controladorPrincipal"


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


    aplicacion.controller('controladorPrincipal', function ($scope,datosJson) {


        $scope.listadoFiltrado = [];
        $scope.listadoTotal = [];
        $scope.listadoCategorias = [];
        $scope.estadoCategorias = [];












        datosJson.listadoTotal(function (resp) {
            $scope.listadoTotal = resp;

            $scope.listadoCategorias=datosJson.listadoCategorias();

            $scope.estadoCategorias = datosJson.retornarlistadocat();

            $scope.prod2= $scope.listadoTotal.filter(function (item) {

             return (item.id_producto == $scope.prod);



             })




        });

        /*
        filtrar = function (cat) {

            if (cat == 'mostrar_todo') {

                $scope.listadoF = $scope.listadoTot;


            } else {


                $scope.listadoF = $scope.listadoTot.filter(function (item) {

                    return (item.categoria == cat);


                })
            }
        };


        this.filtrar = function (cat) {

            if (cat == 'mostrar_todo') {

                $scope.listadoF = $scope.listadoTot;


            } else {


                $scope.listadoF = $scope.listadoTot.filter(function (item) {

                    return (item.categoria == cat);


                })
            }
        };
    */
        this.filtrarProductos = function () {


            $scope.listadoFiltrado = $scope.listadoTotal.filter(function (item) {

                for (i = 0; $scope.estadoCategorias.length > i; i++) {

                    if ($scope.estadoCategorias[i]) {

                        if ($scope.listadoCategorias[i].cat == item.categoria) {

                            return true;


                        }


                    }


                }


                return false;

            });

        datosJson.listadocat($scope.estadoCategorias);




        }






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
