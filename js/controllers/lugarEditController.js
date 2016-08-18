materialAdmin

.controller('lugarEditCtrl', function($filter, $timeout, $stateParams, $state, $scope, lugarGetService, lugarEditService, ngTableParams){

    var self = this;
    self.lang = $stateParams.lang;
	self.id = $stateParams.id;
    
	lugarGetService.getData(self.lang, self.id)
    .then(
        function (result) {

            self.data = result[0];
        },
        function (error) {
            if(error){
                console.log(error.statusText);
            }
        }
    );

    $scope.editar = function(data){
        lugarEditService.getData(data, self.lang, self.id)
        .then(
            function (result) {
                console.log(result);
            },
            function (error) {
                if(error){
                    console.log(error.statusText);
                }
            }
        );
    }

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
.service("lugarGetService", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
    this.getData = function (lang, id) {
        var defer = $q.defer(),
        url = API_URL.url + 'place/';

        $http.get(url + lang + '/' + id)
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (data) {
                    defer.reject(data);
                });

        return defer.promise;
    };
}
])

.service("lugarEditService", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
    this.getData = function (data, lang, id) {
        var defer = $q.defer(),
        url = API_URL.url + 'place/';

        $http({
            url: url + lang + '/' + id,
            method: 'POST',
            params: data
        })
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