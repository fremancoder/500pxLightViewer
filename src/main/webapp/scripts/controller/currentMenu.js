(function(){
	
	var app = angular.module("my500pxViewer");
	
	var MyMenuController = function($location, $scope, $rootScope) {
		
		$scope.isMenu = function(menu){
			if($rootScope.menuOption == menu) {
				return true;
			} else {
				return false;
			}
		}
		
	}	
	
	app.controller("MyMenuController", ["$location", "$scope", "$rootScope", MyMenuController]);
	
}());