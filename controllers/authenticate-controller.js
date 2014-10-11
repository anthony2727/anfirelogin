var app = angular.module('anfireloginApp');


app.controller('authenticateController', ['userService','$route','$scope','firebaseAuth','$location', function(userService,$route,$scope, firebaseAuth, $location){

	
	$scope.login = function(provider){

		// Show our loading image
		$scope.loading = true;

		// DO authentication
		firebaseAuth.authenticateUsingProvider(provider).then(
			// If the user is authenticated
			function(authData){

				// The user is already registered?
				userService.exists(authData.uid).then(
					
					function(resolve){
						// If the user is NOT registered 
						if(!resolve){
							// Let's register it
							var result = userService.register(authData);

							// What was our result?
							result.then(function(resolve){
								// The user got registered
								console.log(resolve);
							}, function(reason){
								// The user didn't get registered
								console.log(reason);
							});

						}else{ 
							// If the user is registered

							// Stop our loading image
							$scope.loading = false;
							// Go to our main page
							$location.path('/home');
							// Reload the view
							$route.reload();
						}
					}
				);

			}, 
			// If the user is not authenticated
			function(reason){
				console.log(reason);
			});
	};

	$scope.register = function(){

	}


}]);