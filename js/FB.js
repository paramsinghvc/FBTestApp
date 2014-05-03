  window.fbAsyncInit = function() {
        FB.init({
          appId      : '1415514292047939',
          xfbml      : true,
          version    : 'v2.0'
        });


	FB.getLoginStatus(handleSessionResponse);
  FB.Event.subscribe('auth.statusChange', update);

      };

  (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

function update (response){
console.log("Status Change");
}

function fbLogin($q){

  var dfd = $q.defer();

 FB.login(function(response) {
   if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');

     FB.api('/me', function(resp) {
       console.log('Good to see you, ' + resp.name + '.');

       var dpUrl='https://graph.facebook.com/'+resp.id+'/picture?type=large';
       
       /* $('body').append("<img src='"+dpUrl+"' />");
		$('body').append("<h2>"+response.hometown.name+'<br>'+response.birthday+'</h2>');
		$('body').append("<br><h4>"+response.bio+'</h4>'); */
    	var interests;
		var photos;
		var friends;
		var likes;
		getInterests($q).then(function(response){
				interests = response;
				getUserFriends($q).then(function(response){
								friends = response;
										getUserLikedPages($q).then(function(response){
										likes = response;
											getUserPhotos($q).then(function(response){
											photos = response;
											dfd.resolve({"BaseResponse":resp,"dpUrl":dpUrl,"Interests":interests,"Photos":photos,"Friends":friends,"Likes":likes});
					});
				});
			});
		});
		
		
		
		


     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
	 dfd.reject(response);
	 
   }
 },{scope:'user_hometown,public_profile,user_about_me,user_birthday,user_interests,user_photos,user_friends,manage_friendlists,user_likes'});

 return dfd.promise;

}

function getInterests($q){
var d = $q.defer();
FB.api('me/interests',function(response){


	d.resolve(response);
	
	
	
});
return d.promise;

} 


 function getUserPhotos($q){
var d = $q.defer();
FB.api('me/photos/uploaded',function(response){

	d.resolve(response);

	
});
return d.promise;
} 

 function getUserFriends($q){
var d = $q.defer();
FB.api("/me/friends",function(response){

	d.resolve(response);

	
});
return d.promise;
} 

 function getUserLikedPages($q){
var d = $q.defer();
FB.api("/me/likes",function(response){

	d.resolve(response);

	
});
return d.promise;
} 

function handleSessionResponse(response) {

 
    if (!response.authResponse) {
        return;
    }

    FB.logout(response.authResponse);
}

