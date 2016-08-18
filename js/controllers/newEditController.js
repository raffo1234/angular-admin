materialAdmin

.controller('newEditCtrl', function($filter, $timeout, $stateParams, $state, $scope, newGetService, newEditService, ngTableParams, API_URL, httpRequest){

    var self = this;
    self.lang = $stateParams.lang;
	self.id = $stateParams.id;
    
	newGetService.getData(self.lang, self.id)
    .then(
        function (result) {
            self.data = result[0];
        },
        function (error) {
            console.log(error.statusText);
        }
    );

    $scope.editar = function(data){
        newEditService.getData(data, self.lang, self.id)
        .then(
            function (result) {
                console.log(result);
            },
            function (error) {
                console.log(error.statusText);
            }
        );
    }

    $scope.eliminar = function(item, lang){
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

            var url = API_URL.url + 'new/delete/' + lang + '/' + item.id;

            httpRequest.send('post', url)
            .then(
                function (result) {
                    console.log(result);

                    swal("Eliminado!", "Elemento elminado", "success"); 
                },
                function (error) {
                    
                    swal("Hubo un problema", "Vuelva a intentarlo.", "error"); 
                }
            );

            
        });
    };


})

.service("newGetService", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
    this.getData = function (lang, id) {
        var defer = $q.defer(),
        url = API_URL.url + 'new/';

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

.service("newEditService", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
    this.getData = function (data, lang, id) {
        var defer = $q.defer(),
        url = API_URL.url + 'new/';

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