materialAdmin

    .controller('newsCtrl', function($filter, $timeout, API_URL, $stateParams, $state, $scope, newsService, ngTableParams, httpRequest, API_URL) {

        var self = this;
        self.lang = $stateParams.lang;
        newsService.getData(self.lang)
            .then(
                function(result) {
                    var data = result;
                    $.map(data, function(n, i) {
                        n.image_fullpath = API_URL.url + 'uploads/news/' + n['image'];
                        n.published = (n.published == "0") ? "No publicado" : "Publicado";
                    });
                    // console.log(data);
                    self.tablenews = new ngTableParams({
                        page: 1, // show first page
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
                function(error) {
                    console.log(error.statusText);
                }
            );


        $scope.agregar = function() {
            var url = API_URL.url + '/new';
            var promesa_add = httpRequest.send("POST", url);
            promesa_add.then(function(response) {
                $state.go($state.current, {}, { reload: true });
            }, function(error) {
                $state.go($state.current, {}, { reload: true });
            });
        }


        $scope.eliminar = function(id) {

            swal({
                title: "Estás seguro?",
                text: "Ésta acción es irreversible",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F44336",
                confirmButtonText: "Si, eliminarlo!",
                closeOnConfirm: false
            }, function() {

                var url = API_URL.url + 'new_item/delete/' + id;
                var promesa_delete = httpRequest.send("POST", url);
                promesa_delete.then(function(response) {
                    swal("Eliminado!", "Elemento elminado", "success");
                    $state.go($state.current, {}, { reload: true });

                }, function(error) {
                    swal("Hubo un problema!", "Elemento no elminado", "error");
                    $state.go($state.current, {}, { reload: true });
                });

            });
        };





    })
    .service("newsService", ["$http", "$q", "API_URL", function($http, $q, API_URL) {
        this.getData = function(lang) {
            var defer = $q.defer(),
                url = API_URL.url + 'news/' + lang + '?to_admin=1';

            $http.get(url)
                .success(function(data) {
                    defer.resolve(data);
                })
                .error(function(data) {
                    defer.reject(data);
                });

            return defer.promise;
        };
    }]);
