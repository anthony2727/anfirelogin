var app = angular.module('anfireloginApp');


app.controller('authenticateController', ['$rootScope','$scope','firebaseAuth','$location', 'userSession', function($rootScope,$scope, firebaseAuth, $location, userSession){

	
	$scope.login = function(provider){

		// Authenticate the user. If it succeed then redirect to /home
		firebaseAuth.authenticateUsingProvider(provider, '/home');
		


	};

	$scope.register = function(){

	}


}]);