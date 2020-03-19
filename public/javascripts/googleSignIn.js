  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    profileImg = profile.getImageUrl();

    tag = '<img src="'+ profileImg + '"></img>'
    console.log(tag);
  
  var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

        if(profile === undefined){
          console.log("user not signed in, no info to return");
        

        }else{
          console.log("hey hey hey "+profile.getId());``
          $("#checkLogin").show();
          $("#profilePic").show();
          $("#profilePic").html(tag);
          $("#signInButton").hide();
          //$("#signInButton").append();

        }

  }

  function returnInfoToScreen(){
    
    const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
  const profile = googleUser.getBasicProfile();
 
    
  }
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      $("#checkLogin").hide();
      $("#profilePic").hide();
      $("#signInButton").show();

    });
  }

  