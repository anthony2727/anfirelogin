var app = angular.module('anfireloginApp');

app.controller('registerController', function($scope, userService){

	$scope.registerUser = function(email, password){
		userService.registerWithPassword(email, password);
	};

});