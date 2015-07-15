(function(){
    var aplicacion = angular.module('einicio');
    

    aplicacion.directive('misCategorias', ['datosJson', function (datosJson) {
        return {
            restrict: 'E',
            scope: {

                categorias: "=",
                catarray: "="


            },
            templateUrl: 'listadoCategorias.html',
            require: "^productosGeneral",

            controller: function ($scope) {


            },

            link: function (scope, element, atrr, cont) {

                scope.mostrar = function () {




                    cont.filtrar2();


                };


                scope.selecciono = function () {

                    if (scope.todos) {

                        for (i = 0; scope.catarray.length > i; i++) {

                            scope.catarray[i] = true;

                        }
                    } else {

                        for (i = 0; scope.catarray.length > i; i++) {

                            scope.catarray[i] = false;


                        }

                    }
                    scope.mostrar();
                };





                /* datosJson.listadoTotal(function (resp) {

                 scope.categorias = datosJson.listadoCategorias();

                 console.log(datosJson.listadoCategorias());

                 //console.log(datosJson.listadoFiltro('cat01'));

                 });
                 */
            }


        }
    }
    ])
    ;



})();
