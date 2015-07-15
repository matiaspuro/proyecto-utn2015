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


        $scope.listadoF = [];
        $scope.listadoTot = [];
        $scope.listadoCat = [];
        $scope.catvalue = [];






        console.log($scope.catvalue);





        datosJson.listadoTotal(function (resp) {
            $scope.listadoTot = resp;

            $scope.listadoCat=datosJson.listadoCategorias();

            $scope.catvalue = datosJson.retornarlistadocat();

            $scope.prod2= $scope.listadoTot.filter(function (item) {

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
        this.filtrar2 = function () {


            $scope.listadoF = $scope.listadoTot.filter(function (item) {

                for (i = 0; $scope.catvalue.length > i; i++) {

                    if ($scope.catvalue[i]) {

                        if ($scope.listadoCat[i].cat == item.categoria) {

                            return true;


                        }


                    }


                }


                return false;

            });

        datosJson.listadocat($scope.catvalue);


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
