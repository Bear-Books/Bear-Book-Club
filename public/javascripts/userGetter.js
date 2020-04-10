//old code

$(document).ready(function() {

    // console.log("started");

    // const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
    // const profile = googleUser.getBasicProfile();
    // const email = profile.getEmail();
    

    // if(profile === undefined){
    //     console.log("no users on the user page");
    //     return;
    // }
    // else{
    //     console.log("logged in" + profile.getBasicProfile());
    // }

    var posts = "";

    console.log("got here");
    const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
    const profile = googleUser.getBasicProfile();

    posts = "Testing " + profile.getEmail();
    posts += '<div class="container">'+
'<div class="row">'+
    //'<div class="col-xs-12 col-sm-6 col-md-6">'+
        '<div class="well well-sm">'+
            '<div class="row">'+
                '<div class="col-sm-6 col-md-4">'+
                    '<img src="'+profile.getImageUrl()+'" alt="" class="img-rounded img-responsive" />'+
                '</div>'+
                '<div class="col-sm-6 col-md-8">'+
                    '<h4>'+
                        ''+profile.getName()+'</h4>'+
                    '<small><cite title="San Francisco, USA">No Location <i class="glyphicon glyphicon-map-marker">'+
                    '</i></cite></small>'+
                    '<p>'+
                        '<i class="glyphicon glyphicon-envelope"></i> '+profile.getEmail()+''+
                        '<br />'+
                        '<i class="glyphicon glyphicon-globe"></i><a href=""> no website</a>'+
                        '<br />'+
                        '<i class="glyphicon glyphicon-gift"></i>no birthday</p>'+
                    '<!-- Split button -->'+
                    '<div class="btn-group">'+
                        '<button type="button" class="btn btn-primary">'+
                            'Social</button>'+
                        '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">'+
                            '<span class="caret"></span><span class="sr-only">Options</span>'+
                        '</button>'+
                        '<ul class="dropdown-menu" role="menu">'+
                            '<li><a href="#">Books to Read</a></li>'+
                            '<li><a href="https://plus.google.com/+Jquery2dotnet/posts">Books have Read</a></li>'+
                            '<li><a href="https://www.facebook.com/jquery2dotnet">Message</a></li>'+
                            '<li class="divider"></li>'+
                            '<li><a href="#">change info (if possible)</a></li>'+
                        '</ul>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    //'</div>'+
'</div>'
'</div>';
        $("#test").html(posts);

    

        
 });

 function test(){
    
   
 }

 function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }

 function returnInfoToScreen(){
    
    const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
  const profile = googleUser.getBasicProfile();
 
    
  }