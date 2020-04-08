  var user_signed_in = false;

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    profileImg = profile.getImageUrl();

    tag = '<img src="'+ profileImg + '"style= "border-radius: 50%; width:60px"></img>'
    console.log(tag);
  
  var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

        if(profile === undefined){
          console.log("user not signed in, no info to return");
        

        }else{
          console.log("hey hey hey "+profile.getId());
          $("#signOutButton").html("Sign Out");

          $("#signOutButton").show();
          $("#profilePic").show();
          $("#profilePic").html(tag);
          $("#signInButton").hide();

          var posts = '<div id = "container">';
            
          posts += '<img src="'+ profileImg + '"style= "border-radius: 50%; width:120px"></img>';

          posts += '<div id="profilePageName"> Name: ' + profile.getName() + '<br>'+
                    'Email: ' + profile.getEmail()
          
          
          
          
                    + '</div>'+
                  '</div>';


          $.ajax({
            // Finding a user with the same name as profile signed in with
            type: 'GET',
            url: '/getUserDatabase?user_name='+ profile.getName(),
            success: function(user){
              // Upon success check how many users where in the database with that name

              console.dir('success', user);
              // If its more than one we do not want to add the user
                  if(user.length > 0){
                    console.log("user in database");
                    console.dir(user);
                    user_signed_in = true;
                  }
                  else{
                    //if it is less than 1 we want to add the user
                    console.log("user not in database");

                    // Adding the user
                    $.ajax({
                      url: '/addUserDatabase/',
                      type: 'POST',
                      dataType: 'json',
                      data: {user_name: profile.getName()},
                      success: function(data){
                          console.log("added the user "+data);
                          console.log(data.user_name);
                          console.log(name);

                      },
                      error: function(error){
                          console.log("error saving order "+error);
                      }
              });
                  }
                  $("#profilePagePic").html(posts);
            },
            error: function(){
                console.log('error on chat page function');
            }
        });
        



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
      $("#signOutButton").hide();
      $("#profilePic").hide();
      $("#signInButton").show();

    });
  }

  
  