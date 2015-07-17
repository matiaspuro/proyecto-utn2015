(function () {


    var aplicacion = angular.module('einicio');

    aplicacion.directive('misProductos', function (datosJson) {
        return {
            restrict: 'E',
            scope: {

                productosFiltrados: "="

            },
            templateUrl: 'listadoProductos.html',

            link: function (scope, elementos, strr, control) {

                /*datosJson.listadoTotal(function (resp) {

                 scope.productos = resp;

                 //console.log(datosJson.listadoCategorias());
                 //console.log(datosJson.listadoFiltro('cat01'));

                 });
                 */
            },
            controller: function ($scope) {



            }

        }
    });

})();