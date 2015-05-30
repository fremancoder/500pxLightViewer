(function (){
	
	angular.module('Authentication', []);
	
	var app = angular.module("my500pxViewer", ["ngRoute", "ngCookies", "Authentication"]);
	
	app.config(function($routeProvider){
		console.log($routeProvider);
		
		$routeProvider
			.when("/userName", 
				{
					templateUrl: "views/userName.html",
					controller: "userNameController"
				})
			.when("/myPhotos", 
					{
						templateUrl: "views/myPhotos.html",
						controller: "MyPhotoListController"
					})
			.when("/myPhotoDetails/:photoid", 
					{
						templateUrl: "views/myPhotoDetails.html",
						controller: "MyPhotoDetailController"
					})
			.otherwise({redirectTo:"/userName"});
	}).run(['$rootScope', '$location', '$cookieStore', function ($rootScope, $location, $cookieStore) {
        
		$rootScope.globals = $cookieStore.get('globals') || {};
        
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if ($location.path() !== '/userName' && !$rootScope.globals.currentUser) {
                $location.path('/userName');
            }
        });
        
    }]);
	
}());