var app = angular.module('anfireloginApp');

app.value('FIREBASE_URL', 'https://anfirelogintest.firebaseio.com/');
app.value('userSession', {});

app.factory('firebaseAuth', function($rootScope,$firebase, $location, FIREBASE_URL, userSession,$route){

	// Reference to our data source 
	var ref = new Firebase(FIREBASE_URL);

	var firebaseAuthProvider = {
		
		authenticateUsingProvider : function (provider, redirect){
			$rootScope.loading =true;
			// Is the user is NOT Authenticated
			if (!this.isAuthenticated()){

				// Let's authenticate it. 
				ref.authWithOAuthPopup(provider, function(error, authData){
										
					// The user got authenticated?
					if (authData){
						// Let's share the user data globally using out userSession service!
						userSession.Auth = authData;
						// Redirect to the main area
						$location.path(redirect);
						// Reload the view
						$route.reload();
					}
					else{
						userSession.Auth = {};
						$rootScope.loading = false;
						$rootScope.$apply();
					}
					
				}.bind(this));
			}

			// Using this option we found that we're dealing with asynchronous data it means that if the 
			// data happens to take longer then when we try to show the response it's probable to get a 
			// null exception as a result.
			// Next step is moved to the q branch in our repository to deal with this problem. 

			
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



