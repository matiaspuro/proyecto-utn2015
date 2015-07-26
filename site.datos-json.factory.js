(function () {
    var aplicacion = angular.module('einicio');

    aplicacion.factory('datosJson', ['$http', function ($http) {

        var listadoProd = [];
        var listadoCat = {};
        var listadoT = [];
        var retornar = {
            listadoTotal: function (callback) {

                $http.get('productos.json').success(function (respuesta) {

                    listadoT = respuesta;
                    callback(respuesta);

                });

            },


            guardaListadoCat: function(datos){

            listadoCat=datos;

            },

            retornaListadoCat: function (){


              return listadoCat;


            },

            guardaListadoProd: function(datos){

                listadoProd=datos;

            },


            retornaListadoProd: function (){


                return listadoProd;


            }



        }
        return retornar;

    }]);



})();
