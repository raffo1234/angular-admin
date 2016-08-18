materialAdmin

.controller('lugaresCtrl', function($filter, $timeout, $stateParams, $state, $scope, lugaresService, ngTableParams){

    var self = this;
    self.lang = $stateParams.lang;
	lugaresService.getData(self.lang)
    .then(
        function (result) {
            var data = result;

            self.tableLugares = new ngTableParams({
                page: 1,            // show first page
                count: 10
            }, {
                total: data.length, // length of data
                getData: function($defer, params) {

                    // use build-in angular filter
                    var orderedData = params.filter() ? $filter('filter')(data, params.filter()) : data;
                    self.id = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    self.title = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(self.title, self.lastModified);
                }
            });

        },
        function (error) {
            console.log(error.statusText);
        }
    );


    $scope.eliminar = function(id){
	//Get confirmation, if confirmed clear the localStorage
        swal({   
            title: "Estás seguro?",   
            text: "Ésta acción es irreversible",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#F44336",   
            confirmButtonText: "Si, eliminarlo!",   
            closeOnConfirm: false 
        }, function(){
            
            swal("Eliminado!", "Elemento elminado", "success"); 
        });
    };

})
.service("lugaresService", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
    this.getData = function (lang) {
        var defer = $q.defer(),
        url = API_URL.url + 'places/';

        $http.get(url + lang)
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (data) {
                    defer.reject(data);
                });

        return defer.promise;
    };
}
]);