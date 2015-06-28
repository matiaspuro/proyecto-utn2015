/**
 * Created by Matias-note on 27/06/2015.
 */

(function () {

    var aplicacion = angular.module('einicio', ['ngRoute']);




        aplicacion.config(function ($routeProvider) {

        $routeProvider
            .when("/", {
                controller: "inicioCtrl",
                controllerAs: "ic",
                templateUrl: "e_inicio.html"
            })
            .when("/productos", {
                controller: "productosCtrl",
                controllerAs: "pc",
                templateUrl: "e_productos.html"
            })


    });

    aplicacion.controller('inicioCtrl', function () {


    });


    aplicacion.controller('productosCtrl', function () {


    });
/**/

/* aplicacion.directive('inicio-principal')


*/
 })();
