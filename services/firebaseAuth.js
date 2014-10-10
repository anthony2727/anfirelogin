var app = angular.module('anfireloginApp');

app.value('FIREBASE_URL', 'https://anfirelogintest.firebaseio.com/');
app.value('userSession', {});

app.factory('firebaseAuth', function($q,$rootScope,$firebase, $location, FIREBASE_URL, userSession,$route){

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
						// Let's share the user data globally using out userSession service!
						userSession.Auth = authData;
						// When the data is available, we pass it to the defer api
						deferred.resolve(authData);						
					}
					else{
						// The data was not available
						deferred.reject('The user was not authenticated');
						userSession.Auth = {};
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
		},
		userExists : function(uid){
			return ref.child('users').child(uid);
		},
		registerUser : function(user){
			ref.child('users').child(user.uid).set(user);
		}
	};

	return firebaseAuthProvider;

});



