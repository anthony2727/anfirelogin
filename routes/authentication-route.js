var app = angular.module('anfireloginApp');

// LOGIN/REGISTER ROUTES

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/login', {
			templateUrl : 'templates/authenticate-template.html',
			controller : 'authenticateController'
		})
		.when('/register',{
			templateUrl : 'templates/register-template.html'
		});
}]);