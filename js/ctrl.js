var FBApp = angular.module('FBApp',['ngRoute']);


FBApp.factory('AppFactory',function($rootScope){


		var factory = {};
		
		var profile = {};
		
		factory.getProfile =function(){
		
			profile = JSON.parse(localStorage.getItem("Profile"));
			return profile;
			
		}
		
		factory.setProfile =function(p){
		
			//profile = p;
			localStorage.setItem("Profile",JSON.stringify(p));
		}
		
		
		
		return factory;


});



var controllers = {};

FBApp.controller('SignInController',function($scope,$q,$window,AppFactory){

			$scope.SignIn = function(){
				
				fbLogin($q).then(function(res){
				
				console.log(res);
				AppFactory.setProfile(res);
				$window.location.href= "#/loginSuccess";
				
				},function(res){
				
				console.log("failed Promise");
				});
					
			};

});


FBApp.controller('ProfileInfoController',function($scope,AppFactory){

			//$scope.params = $routeParams;

			$scope.myProfile =  AppFactory.getProfile();
			
			
});


FBApp.controller('FriendsController',function($scope,AppFactory){

			//$scope.params = $routeParams;

			$scope.myProfile =  AppFactory.getProfile();
			
			
});


FBApp.controller('LikesController',function($scope,AppFactory){

			//$scope.params = $routeParams;

			$scope.myProfile =  AppFactory.getProfile();
			
			
});

FBApp.controller('SignOutController',function($scope,$window,AppFactory){

	$scope.SignOut = function(){
			FB.logout(function(response){

			console.log(response+" : Logged Out");
			localStorage.clear();
			$window.location.href= "#/";

		});
		
	}
});


FBApp.config(function($routeProvider){

		$routeProvider.when('/',{
		
				controller : 'SignInController',
				templateUrl : 'Views/SignIn.html' 
		
		}).when('/loginSuccess',{
		
				controller : 'ProfileInfoController',
				templateUrl:'Views/Profile.html'
		
		}).when('/Friends',{
		
				controller : 'FriendsController',
				templateUrl:'Views/Friends.html'
		
		}).when('/Likes',{
		
				controller : 'LikesController',
				templateUrl:'Views/Likes.html'
		
		}).otherwise({redirectTo : '/'});


});