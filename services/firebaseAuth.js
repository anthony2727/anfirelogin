var app = angular.module('anfireloginApp');

app.value('FIREBASE_URL', 'https://anfirelogintest.firebaseio.com/');

app.factory('firebaseAuth', function($q,$rootScope,$firebase, $location, FIREBASE_URL, $route){

	// Reference to our data source 
	var ref = new Firebase(FIREBASE_URL);

	var firebaseAuthProvider = {
		
		authenticateUsingProvider : function (provider){
			// Getting a new instance of the defer API.
			var deferred = $q.defer();

			if (!this.isAuthenticated()){

				// Let's authenticate it. 
				ref.authWithOAuthPopup(provider, function(error, authData){
				
					// The user got authenticated?
					if (authData){
						// When the data is available, we pass it to the defer api
						deferred.resolve(authData);						
					}
					else{
						// The data was not available
						deferred.reject('The user was not authenticated');
					}
					
				}.bind(this));
			}

			return deferred.promise;
			
		},
		
		isAuthenticated : function(){
			// well...first, let's say the user is no authenticated.
			var is = false;
			// Get the info to know if the user is authenticated
			var authData = ref.getAuth();
			// Is the user Authenticated?
			if (authData){
				// yes!
				is = true;
			}
			return is; 
		}
	};

	return firebaseAuthProvider;

});



