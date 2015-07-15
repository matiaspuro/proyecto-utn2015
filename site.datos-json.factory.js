(function () {
    var aplicacion = angular.module('einicio');

    aplicacion.factory('datosJson', ['$http', function ($http) {
        var listadoCat = [];
        var listadoT = [];
        var retornar = {
            listadoTotal: function (callback) {

                $http.get('productos.json').success(function (respuesta) {

                    listadoT = respuesta;
                    callback(respuesta);

                });

            },


            listadocat: function(datos){

            listadoCat=datos;

            },

            retornarlistadocat: function (){


              return listadoCat;


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



})();
