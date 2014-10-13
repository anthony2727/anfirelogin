var app = angular.module('anfireloginApp');

app.factory('userService', function($firebase, FIREBASE_URL, $q){

	// Reference to out data source
	var ref = new Firebase(FIREBASE_URL); 
	
	var s = $firebase(ref);

	var userSource='users';

	return {
		register : function(userData){
			// Asynchronous callback container
			var deferred = $q.defer();
			// Storing the data into our firebase datasource
			ref.child(userSource).child(userData.uid).set(userData, function(error){
				if(!error){
					deferred.resolve('The user was registered successfully');
				}else{
					deferred.reject('ERROR, We could not register the user');
				}
			});

			return deferred.promise;

		},
		exists : function(uid){
			var deferred = $q.defer();
			
			ref.child(userSource).child(uid).once('value', function(snapshot){
				if (snapshot.val()!==null){
					deferred.resolve(true);
				}				
				else{
					deferred.resolve(false);
				}
			}.bind(this));
			
			return deferred.promise;
		}
	};
});