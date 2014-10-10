var app = angular.module('anfireloginApp');	

app.directive('loading', function(){
	return {
		restrict : 'E',
		scope : {
			showLoading : '='
		},
		templateUrl : 'directives/templates/loading-template.html',
		link : function(scope, element, attr){
			scope.showLoading = scope.showLoading;
		}
	};
});