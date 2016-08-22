materialAdmin

  .controller('datepickerCtrl', function($scope, API_URL, dateFilter) {


 // DATEPICKER
  $scope.today = function() {
      var date = new Date();
      $scope.dt = dateFilter(date, 'yyyy-MM-dd');
  };
  $scope.today();


  $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event, opened) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[opened] = true;
  };

  $scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: -1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

})