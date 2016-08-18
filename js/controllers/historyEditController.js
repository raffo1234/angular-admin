materialAdmin

.controller('historyEditCtrl', function($filter, $timeout, $stateParams, $state, $scope, historyGetService, historyEditService, ngTableParams, API_URL, httpRequest){

    var self = this;
    self.lang = $stateParams.lang;
	self.id = $stateParams.id;
    
	historyGetService.getData(self.lang, self.id)
    .then(
        function (result) {
            self.data = result[0];
        },
        function (error) {
            console.log(error.statusText);
        }
    );

    $scope.editar = function(data){
        historyEditService.getData(data, self.lang, self.id)
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

            var url = API_URL.url + 'history/delete/' + lang + '/' + item.id;

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

.service("historyGetService", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
    this.getData = function (lang, id) {
        var defer = $q.defer(),
        url = API_URL.url + 'history/';

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

.service("historyEditService", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
    this.getData = function (data, lang, id) {
        var defer = $q.defer(),
        url = API_URL.url + 'history/';

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