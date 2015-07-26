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
                abstract: true,
                template: "<ui-view/>",
                controller: "controladorPrincipal"
            })

            .state('productos.all', {
                url: "/all",
                templateUrl: "e_productos.html",

            })


            .state('productos.detalle', {
                url: "/detalle/:prod",
                templateUrl: "prueba2.html",
                controller: function ($scope, $stateParams) {

                    $scope.prod = $stateParams.prod;

                }

            })

    });


    aplicacion.controller('controladorPrincipal', function ($scope, datosJson) {

        var filtrotexto = ["categoria", "categoria2"];
        $scope.filtrotexto= filtrotexto;



        $scope.listadoProductos = [];
        $scope.listadoTotalProductos = [];

        $scope.listadoTotalCategorias = {};

        $scope.listadoCategorias = {};
        $scope.estadoCategorias = [];


        datosJson.listadoTotal(function (respuesta) {
            $scope.listadoTotal = respuesta;

            //  $scope.listadoCategorias = $scope.dameCategorias(filtrotexto, $scope.listadoTotal);

            // $scope.listadoCategorias = $scope.inicializarEstadoCategorias($scope.listadoCategorias);

            // console.log($scope.listadoCategorias);


            //$scope.estadoCategorias = datosJson.retornaListadoCat();

            // $scope.prod2 = $scope.listadoTotal.filter(function (item) {

            //   return (item.id_producto == $scope.prod);


            // })


        });


        $scope.dameCategorias = function (filtrotexto, listadoT) {

            var listadoCategoriasRetornar = {};
            filtrotexto.forEach(function (elemento) {

                var listadoC = listadoT.map(function (item) {
                    return {nombre: item[elemento]};

                });

                listadoC = listadoC.filter(function (a, b, c) {

                    for (var i = (b + 1); c.length > i; i++) {

                        if (c[i].nombre == a.nombre) {
                            return false;
                        }
                    }
                    return true
                });

                listadoC = listadoC.sort();

                listadoCategoriasRetornar[elemento] = listadoC;

            });

            return listadoCategoriasRetornar;
        };


        $scope.inicializarEstadoCategorias = function (listadoCategorias) {

            //   var arrayListadoCategorias=Object.keys(listadoCategorias); devuelve un array con cada atributo del objeto

            for (var listado in listadoCategorias) {


                listadoCategorias[listado].forEach(function (item, index) {

                    if (!item.estado) {

                        item.estado = false;

                    }


                });


            }

            return listadoCategorias;
        };


        $scope.dameCategoriasFiltrado = function (listadoCategorias, listadoProductos) {


            var listadoCategoriasSinSeleccionar = $scope.categoriasSinSeleccionadar(listadoCategorias);


            var categoriasFiltradas=$scope.dameCategorias(listadoCategoriasSinSeleccionar,listadoProductos);

            categoriasFiltradas= $scope.inicializarEstadoCategorias(categoriasFiltradas);


            listadoCategoriasSinSeleccionar.forEach(function(elemento){


                listadoCategorias[elemento]=categoriasFiltradas[elemento];





            });










        }


        $scope.categoriasSinSeleccionadar = function (listadoCategorias) {
            var listadoSeleccionado = [];

            for (var categoria in listadoCategorias) {

                var boolSeleccionada = listadoCategorias[categoria].every(function (elemento) {

                    if (!elemento.estado) {

                        return true;

                    }

                    return false;


                });

                if (boolSeleccionada == true) {

                    listadoSeleccionado.push(categoria);


                }


            }

            return listadoSeleccionado;
        };


        $scope.categoriasSeleccionadas = function (listadoCategorias) {
            var listadoSeleccionado = [];

            for (var categoria in listadoCategorias) {

                var boolSeleccionada = listadoCategorias[categoria].some(function (elemento) {

                    if (elemento.estado) {

                        return true;

                    }

                    return false;


                });

                if (boolSeleccionada == true) {

                    listadoSeleccionado.push(categoria);


                }


            }

            return listadoSeleccionado;
        };


        this.mostrarCategorias = function () {
            if (Object.keys($scope.listadoCategorias).length == 0) {

                datosJson.listadoTotal(function (respuesta) {
                    $scope.listadoTotalProductos = respuesta;
                    $scope.listadoProductos = respuesta;


                    $scope.listadoTotalCategorias = $scope.dameCategorias(filtrotexto, $scope.listadoTotalProductos);
                    $scope.listadoCategorias = $scope.listadoTotalCategorias;
                    $scope.listadoCategorias = $scope.inicializarEstadoCategorias($scope.listadoCategorias);

                    datosJson.guardaListadoCat($scope.listadoCategorias);


                })
            }


        }


        this.mostrarProductos = function () {

            $scope.listadoTP = $scope.listadoTotalProductos;


            var arrayCategoriasSeleccionadas = $scope.categoriasSeleccionadas($scope.listadoCategorias);


            if (arrayCategoriasSeleccionadas.length != 0) {


                arrayCategoriasSeleccionadas.forEach(function (catGeneral) {

                    $scope.listadoProductos = [];
                    $scope.listadoCategorias[catGeneral].forEach(function (catProductos) {

                        if (catProductos.estado) {

                            $scope.listadoProductos = $scope.listadoProductos.concat($scope.listadoTP.filter(function (elementoProducto, index, arrayProducto) {

                                if (elementoProducto[catGeneral] == catProductos.nombre) {

                                    return true


                                }


                            }))


                        }


                    });
                    $scope.listadoTP = $scope.listadoProductos;


                });
                    $scope.dameCategoriasFiltrado($scope.listadoCategorias,$scope.listadoProductos);

            } else {


                $scope.listadoProductos = $scope.listadoTotalProductos;
                $scope.listadoCategorias=$scope.dameCategorias(filtrotexto,$scope.listadoProductos);
                $scope.listadoCategorias=$scope.inicializarEstadoCategorias($scope.listadoCategorias);



            }


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

                    $scope.categorias = datosJson.retornaListadoCat();
                    console.log(datosJson.retornaListadoCat());
                    //console.log(datosJson.listadoFiltro('cat01'));
                    $scope.variablePrueba = "hola";

                });

            }

        }

    }]);


    /* aplicacion.directive('inicio-principal')


     */


})


();
