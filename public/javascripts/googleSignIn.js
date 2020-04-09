  var user_signed_in = false;
  var global_user_name = "";

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
          
          // posts is what the user profile gets appended to
          var posts = '<div id = "container">';
          
          var section1 = '<div class="row"><div class="col-sm-4"><div class="card"><div class="card-body"><img src="'+ profileImg+'id="profile_img"></img>';
          var section2 = '<h5 class="card-title">'+profile.getName()+'</h5><p class="card-text">';
          var section3 = 'With supporting text below as a natural lead-in to additional content.</p>';
          var section4 = '<a href="#" class="btn btn-primary">Go somewhere</a>';

          var section5 = '</div></div></div><div class="col-sm-4"><div class="card"><div class="card-body"><h5 class="card-title">';
          var section6 = 'My Current Reading List</h5><p class="card-text">';
          var section7 = 'With supporting text below as a natural lead-in to additional content.</p>';
          var section8 = '<a href="#" class="btn btn-primary">Go somewhere</a>';
          var section9 = '</div></div></div>';

          var section10 = '<div class="col-sm-4"><div class="card"><div class="card-body"><h5 class="card-title">';
          var section11 =  'Books Completed</h5><p class="card-text">';
          var section12 = 'With supporting text below as a natural lead-in to additional content.</p>';
          var section13 = '<a href="#" class="btn btn-primary">Go somewhere</a>';
          var section14 = '</div></div></div></div>';

          posts += section1 +section2 +section3+section4+section5+section6+section7+section8+section9+section10+section11+section12+section13+section14;
          /*
          posts += '<img src="'+ profileImg + '"style= "border-radius: 50%; width:120px"></img>';

          posts += '<div id="profilePageName"> Name: ' + profile.getName() + '<br>'+
                    'Email: ' + profile.getEmail()

                    + '</div>'+
                  '</div>';
          */

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
                    global_user_name = profile.getName();
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

  
  