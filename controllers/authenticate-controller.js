var app = angular.module('anfireloginApp');


app.controller('authenticateController', ['$route','$rootScope','$scope','firebaseAuth','$location', 'userSession', function($route,$rootScope,$scope, firebaseAuth, $location, userSession){

	
	$scope.login = function(provider){

		// Show our loading image
		$scope.loading = true;

		// DO authentication
		var promise = firebaseAuth.authenticateUsingProvider(provider);

		promise.then(
			// If the user is authenticated
			function(authData){
				// Stop our loading image
				$scope.loading = false;
				// Go to our main page
				$location.path('/home');
				// Reload the view
				$route.reload();

			}, 
			// If the user is not authenticated
			function(reason){
				console.log(reason);
			});
		};

	$scope.register = function(){

	}


}]);