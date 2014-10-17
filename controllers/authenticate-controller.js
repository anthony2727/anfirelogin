var app = angular.module('anfireloginApp');


app.controller('authenticateController', ['userService','$route','$scope','firebaseAuth','$location', function(userService,$route,$scope, firebaseAuth, $location){

	// error model to contain list of errors
	$scope.error = {
		show : false,
		errors : [];
	};

	var error = function(){
		var type;
		var message;
	}
	error.prototype.set = function(type, message){
		this.type = type;
		this.message = message;
	}

	// This object is used to provider help 
	var helpers ={

		loadingCallback : function(provider, status){

			$scope.loading = status;
			$scope.provider = provider;

			return {
				next : function(nextView){
					// Go to our main page
					$location.path(nextView);
					// Reload the view
					$route.reload();			
				}
			};
		}
	};
	// Implementing the angular.extend function (des, orig)
	angular.extend($scope, helpers);


	// Login using the firebase authWithPassword method
	$scope.loginWithPassword = function(email, password){
		firebaseAuth.authenticateUsingPassword(email, password)
	}
	// Login using th firbease authWithOAuthPopup method
	$scope.login = function(provider){

		// Show our loading image
		$scope.loadingCallback(provider, true);
		
		// DO authentication
		firebaseAuth.authenticateUsingProvider(provider).then(
			// The user was authenticated
			function(authData){
				// The user is already registered?
				userService.exists(authData.uid).then(
					function(resolve){
						// If the user is NOT registered 
						if(!resolve){
							// Let's register it
							var result = userService.registerWithProvider(authData);
							// Got the user registered?
							result.then(function(resolve){
								// The user got registered
								// If the user is registered, then...
								// Stop our loading image and go to the next view
								$scope.loadingCallback(provider, false).next('/home');
							}, function(reason){
								// The user didn't get registered
								console.log(reason);
							});
						// The user is already registered
						}else{ 
							$scope.loadingCallback(provider, false).next('/home');
						}
					}
				);
			}, 
			// The user wasn't authenticated
			function(reason){
				$scope.loadingCallback(provider, false).next('/home');
			});
	};

	

}]);