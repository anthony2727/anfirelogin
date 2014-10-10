var app = angular.module('anfireloginApp');


app.controller('authenticateController', ['$rootScope','$scope','firebaseAuth','$location', 'userSession', function($rootScope,$scope, firebaseAuth, $location, userSession){

	
	$scope.login = function(provider){

		// Using our loading directive
		$scope.loading = true;

		// Authenticate the user. If it succeed then redirect to /home
		var promise = firebaseAuth.authenticateUsingProvider(provider);

		promise.then(function(authData){
			// console.log(authData);
			$scope.loading = false;
		}, function(reason){
			console.log(reason);
		});

	};

	$scope.register = function(){

	}


}]);