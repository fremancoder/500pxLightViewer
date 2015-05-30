(function(){
	
	var app = angular.module("my500pxViewer");
	
	var MyMenuController = function($location, $scope) {
		
		$scope.switch = function(type){
			if(type == 'photoList') {
				$scope.currentMenuMyPhotos = false;
			} else {
				$scope.currentMenuMyPhotos = true;
			}
		}
		
	}	
	
	app.controller("MyMenuController", ["$location", "$scope", MyMenuController]);
	
}());