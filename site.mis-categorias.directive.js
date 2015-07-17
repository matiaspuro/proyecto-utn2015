(function(){
    var aplicacion = angular.module('einicio');
    

    aplicacion.directive('misCategorias', ['datosJson', function (datosJson) {
        return {
            restrict: 'E',
            scope: {

                listadoCategorias: "=",
                estadoCategorias: "="


            },
            templateUrl: 'listadoCategorias.html',
            require: "^productosGeneral",

            controller: function ($scope) {


            },

            link: function (scope, element, atrr, cont) {

                scope.mostrarProductos = function () {




                    cont.filtrarProductos();


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
