

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

            .state('ecommerce', {
                url: '/ecommerce',
                abstract:true
            })

            .state('ecommerce.productosLista', {
            url: '/productos/:productosId',
            templateUrl: 'e_productos.html',

            controllerAs:"prod",

            controller: function($scope, $stateParams) {
                debugger;
                this.productosId = $stateParams.productosId;
                this.vista="prueba2.html";
            }
        })

            .state('ecommerce.productosDetalle', {
                url: '/productos/:productosId',
                templateUrl: 'e_productos_detalle.html',

                controllerAs:"prod",

                controller: function($scope, $stateParams) {
                    debugger;

                    this.productosId = $stateParams.productosId;
                    this.vista="prueba2.html";
                }
            })

        /*
            .state('productos', {
                url: "/productos",
                templateUrl: "e_productos.html",
                 controller: function ($scope,$http) {


                 $http.get('productos.json').success(function (respuesta) {

                 $scope.productos=respuesta;
                 }

                 );

                 }

            }) */




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
