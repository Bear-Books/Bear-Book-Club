$(document).ready(
    function() {
        //var User = require('../models/Users');
        console.log("testing");
        var username = $("#the_user").text();
        var us = "";
        username = username.toString();
        var posts = "";
        get_user();
        function get_user() {			
            $.ajax({
                url: '/getUsers/',
                type: 'GET',
                success: function (data) {
                    console.log(data);
                    for( b in data){
                        console.log(b);
                        if(username === data[b].user_name){
                            console.log("username: "+data[b].user_name);
                            us = data[b].user_name;
                            posts += us;
                            posts += "\n"+data[b].books_to_read;
                            posts += "\n"+data[b].books_have_read+"\n";
                            break;
                        }

                    }
                    console.log(us);
                    if(us == ""){
                        $("#user_page").html() = "no user matches that input";
                        console.log("user does not exist");
                    }else{
                        $("#user_page").html(posts);
                    }
                }
                   
            });
            
        }

    });