(function () {


    var aplicacion = angular.module('einicio');

    aplicacion.directive('productosGeneral', ['datosJson', function (datosJson) {
        return {
            restrict: "E",

            transclude: true,
            template: "<div ng-transclude=''></div>",


            controller: "controladorPrincipal"


        }


    }]);

})();
