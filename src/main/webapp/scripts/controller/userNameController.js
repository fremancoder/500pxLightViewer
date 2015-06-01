(function (){
'use strict';
  
angular.module('Authentication')
  
.controller('userNameController',
    ['$scope', '$rootScope', '$location', '$cookieStore', 
    function ($scope, $rootScope, $location, $cookieStore) {

    	$scope.setUserName = function () {
    		$rootScope.menuOption = 'list';

            if($scope.username){
                $rootScope.globals = { currentUser: { username: $scope.username } };
                $cookieStore.put('globals', $rootScope.globals);
                $location.path('/myPhotos');
            } else {
                $scope.error = response.message;
                $scope.dataLoading = false;
            } 
        }
    }]);

}());