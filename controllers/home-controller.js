var app = angular.module('anfireloginApp');

app.controller('homeController', function($scope, userSession, firebaseAuth){
	// $scope.profile.image=userSession.Auth.cachedUserProfile.picture.data.url;

	$scope.profile = {};
	$scope.profile.image=userSession.getUserData().facebook.cachedUserProfile.picture.data.url;
	$scope.profile.displayName = userSession.getUserData().facebook.displayName;

});