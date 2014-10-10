var app = angular.module('anfireloginApp');


app.controller('authenticateController', ['$route','$rootScope','$scope','firebaseAuth','$location', 'userSession', function($route,$rootScope,$scope, firebaseAuth, $location, userSession){

	
	$scope.login = function(provider){

		// Using our loading directive
		$scope.loading = true;

		// Authenticate the user. If it succeed then redirect to /home
		var promise = firebaseAuth.authenticateUsingProvider(provider);

		promise.then(function(authData){
			// console.log(authData);
			$scope.loading = false;
			// Go to our main page
			$location.path('/home');
			$route.reload();

		}, function(reason){
			console.log(reason);
		});

	};

	$scope.register = function(){

	}


}]);