materialAdmin

.controller('messagesCtrl', function($filter, $timeout, $stateParams, $state, $scope, messagesService, ngTableParams, httpRequest, API_URL){

    var self = this;
    self.lang = $stateParams.lang;
	messagesService.getData(self.lang)
    .then(
        function (result) {
            var data = result;
            
            self.tableMessages = new ngTableParams({
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


    $scope.agregar = function(){
        var url = API_URL.url + '/message';
        var promesa_add = httpRequest.send("POST", url);
        promesa_add.then(function(response){
            $state.go($state.current, {}, {reload: true}); 
        }, function(error){
            $state.go($state.current, {}, {reload: true}); 
        });
    }


    $scope.eliminar = function(id){
       
        swal({   
            title: "Estás seguro?",   
            text: "Ésta acción es irreversible",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#F44336",   
            confirmButtonText: "Si, eliminarlo!",   
            closeOnConfirm: false
        }, function(){
                
            var url = API_URL.url + 'message_item/delete/' + id;
            var promesa_delete = httpRequest.send("POST", url);
            promesa_delete.then(function(response){
                swal("Eliminado!", "Elemento elminado", "success"); 
                $state.go($state.current, {}, {reload: true}); 
                
            }, function(error){
                swal("Hubo un problema!", "Elemento no elminado", "error"); 
                $state.go($state.current, {}, {reload: true}); 
            });

            
        });
    };





})
.service("messagesService", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
    this.getData = function (lang) {
        var defer = $q.defer(),
        url = API_URL.url + 'messages/';

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