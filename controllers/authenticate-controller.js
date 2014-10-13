var app = angular.module('anfireloginApp');


app.controller('authenticateController', ['userService','$route','$scope','firebaseAuth','$location', function(userService,$route,$scope, firebaseAuth, $location){

	$scope.setLoadingStatus = function(status){
		$scope.loading = status;
	}

	$scope.loadNewView = function(route){
		// Go to our main page
		$location.path(route);
		// Reload the view
		$route.reload();
	}

	$scope.login = function(provider){

		// Show our loading image
		this.setLoadingStatus(true);
		
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
							// Got the user registered?
							result.then(function(resolve){
								// The user got registered
								// If the user is registered, then...
								// Stop our loading image
								$scope.setLoadingStatus(false);
								// Load new View and controller
								$scope.loadNewView('/home');
							}, function(reason){
								// The user didn't get registered
								console.log(reason);
							});
						// else, If the user is registered, then...
						}else{ 
							// Stop our loading image
							$scope.setLoadingStatus(false);
							// Load new view and controller
							$scope.loadNewView('/home');
						}
					}
				);
			}, 
			// If the user got not authenticated
			function(reason){
				// Stop our loading image
				$scope.setLoadingStatus(false);
				// Show error message. 
				console.log(reason);
			});
	};

	$scope.register = function(){

	}

}]);