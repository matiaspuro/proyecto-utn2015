(function () {


    var aplicacion = angular.module('einicio');

    aplicacion.directive('productosGeneral', ['datosJson', function (datosJson) {
        return {
            restrict: "E",

            transclude: true,
            template: "<div ng-transclude=''></div>",


            controller: function ($scope) {
                $scope.listadoF = [];
                $scope.listadoTot = [];
                $scope.listadoCat = [];
                $scope.catvalue = [];





                datosJson.listadoTotal(function (resp) {
                    $scope.listadoTot = resp;
                    $scope.filtrar('mostrar_todo');

                    $scope.prod2= $scope.listadoTot.filter(function (item) {

                        return (item.id_producto == $scope.prod);


                    })
                console.log($scope.prod2);



                });


                $scope.filtrar = function (cat) {

                    if (cat == 'mostrar_todo') {

                        $scope.listadoF = $scope.listadoTot;
                    } else {


                        $scope.listadoF = $scope.listadoTot.filter(function (item) {

                            return (item.categoria == cat);


                        })
                    }
                };

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


                }


            }


        }


    }]);

})();
