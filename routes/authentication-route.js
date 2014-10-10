var app = angular.module('anfireloginApp');

// LOGIN/REGISTER ROUTES

app.config(['$routeProvider', function($routeProvider,$route){
	$routeProvider
		.when('/login', {
			templateUrl : 'templates/authenticate-template.html',
			controller : 'authenticateController'
		})
		.when('/register',{
			templateUrl : 'templates/register-template.html'
		})
		.when('/home', {
			templateUrl : 'templates/home-template.html',
			controller : 'homeController',
		});
}]);

app.run(function($rootScope, firebaseAuth, $location){
	$rootScope.$on('$routeChangeStart', function(ev, next, current){
		if(next.orginalPath!='/login'){
			if(!firebaseAuth.isAuthenticated()){
				$location.path('/login');
			}
		}
	});
	$rootScope.$on('$routeChangeSuccess', function(ev, next, current){
		
	});

	

});