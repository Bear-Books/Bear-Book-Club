



var the_receiver = "";
var the_name = "";

$(document).ready(
    function() {        
 
        //variables to get at different divs on chat.hbs page
        var $private_message_form = $('#send-private-message');
        var $private_message_box = $('#privateMessage');
        var $private_chat = $('#privateChat');



        //when user sends a private message,
        //we take the value from the message box and
        //append it to the private chat in local to show
        //it has been sent. we also send it to the 
        //chatDatabase to be retrieved for another time and
        //so that the receiver can also see the message sent.
        $private_message_form.submit(function(e){
            e.preventDefault();
            const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
            const profile = googleUser.getBasicProfile();
            var name = profile.getName();
            var message_box = $private_message_box.val();
            message_box = message_box.replace(/([{}\[\]\|\\:;<>$,.])+/g, '');
            if(profile === undefined){
                console.log("user not signed in, no info to return");
            }else{
                $.ajax({
                    url: '/addMessageDatabase/',
                    type: 'POST',
                    dataType: 'json',
                    data: {sender: name,
                    receiver: the_receiver,
                    message: message_box
                    },
                    success: function(data){
                        $private_chat.append('<div class="d-flex justify-content-end mb-4">'+
                                    '<div class="msg_cotainer_send msg" style = "overflow-wrap: break-word;">'+message_box+ 
                                    '</div>'+
                                    '<div class="img_cont_msg"><img src="'+profile.getImageUrl()+'"class="rounded-circle user_img_msg">'+
                                    '</div>'+
                                    '</div>');
                    },
                    error: function(error){
                        console.log("error saving order "+error);
                    }
                });
            }
            $private_message_box.val('');
        });
            









        var $user = $('#users');

        //this code retrieves all the users names and 
        //makes a list of them to be chosen from to message
        $.ajax({
            type: 'GET',
            url: '/getAllUserDatabase',
            success: function(data){
                console.log('success', data);
                
                $.each(data, function(index, user){
                    console.log(data[index].user_name);
                    $user.append("<button id = 'b"+index+"' class = 'btn-block btn-primary btn-lg btn-primary' onclick = 'privateMsg(this)'>"+data[index].user_name+ "</button>")
                });

            },
            error: function(){
                console.log('error on chat page function');
            }
        });






        var counter = 0;

        //when the user clicks onto another user to message,
        //we empty the last conversation and load up the chatDatabase,
        //if there is any message that has both users particapating
        //in the convo it posts it to the page
        privateMsg = function(obj){
            //alert("private message");
            $('#privateChatWrap').show();
            $('#privateChat').empty();
            the_receiver = $(obj).text();
            $("#private_box").empty();
            $("#private_box").append('<b>'+the_receiver+'</b>');
            const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
            const profile = googleUser.getBasicProfile();
            var name = profile.getName();
            the_name = name;
            if(profile === undefined){
                console.log("user not signed in, no info to return");
            }else{

            counter = 0;
            $.ajax({
                type: 'GET',
                url: '/getMessageDatabase',
                success: function(data){
                    console.log('success ', data);
                    $.each(data, function(index, user){
                        if((name === data[index].sender && 
                        the_receiver === data[index].receiver) ||
                        (the_receiver === data[index].sender &&
                        name === data[index].receiver)){
                            if(data[index].sender === name){
                                $private_chat.append('<div class="d-flex justify-content-end mb-4">'+
								    '<div class="msg_cotainer_send msg" style = "overflow-wrap: break-word;">'+ data[index].message + 
								    '</div>'+
								    '<div class="img_cont_msg"><img src="'+profile.getImageUrl()+'"class="rounded-circle user_img_msg">'+
                                    '</div>'+
                                    '</div>');
                            }else{
                            $private_chat.append('<div class="d-flex justify-content-start mb-4">'+
								    '<div class="img_cont_msg">'+
									'<img src="https://www.seekpng.com/png/small/41-410093_circled-user-icon-user-profile-icon-png.png" class="rounded-circle user_img_msg">'+
						    		'</div>'+
					    			'<div class="msg_cotainer msg" style = " overflow-wrap: break-word;">'+data[index].message +
				    				'</div>'+
                                    '</div>');      
                            }
                            console.log(data);
                            counter++;
                    
                        }else{
                            return;
                        }
                    console.log(data);
                    //console.log($user);
                });

                if($private_chat.text() === ""){
                    $private_chat.append("send a message to "+the_receiver);
                }
            },
            error: function(){
                console.log('error on chat page function');
            }
        });

        }
        }


        //this is an interval timer to retrieve messages
        //from database every 10 seconds between both
        //users. if there are new messages, it shall retrieve
        //them for both users. if not, it leaves messages as is,
        //and does not affect them
        setInterval(function(){
            var html = "";
            var inside_counter = 0;
            const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
            const profile = googleUser.getBasicProfile();
            var imageUrl = profile.getImageUrl();
            $.ajax({
            type: 'GET',
            url: '/getMessageDatabase',
            success: function(data){
                console.log('success', data);
                $.each(data, function(index, user){
                    if((the_name === data[index].sender && 
                    the_receiver === data[index].receiver) ||
                    (the_receiver === data[index].sender &&
                    the_name === data[index].receiver)){
                        if(data[index].sender === the_name){


                            html += '<div class="d-flex justify-content-end mb-4">'+
								'<div class="msg_cotainer_send msg" style = "overflow-wrap: break-word;">'+ data[index].message + 
								'</div>'+
								'<div class="img_cont_msg"><img src="'+imageUrl+'"class="rounded-circle user_img_msg">'+
                                '</div>'+
                                '</div>';


                        }else{

                            html += '<div class="d-flex justify-content-start mb-4">'+
								'<div class="img_cont_msg">'+
								'<img src="https://www.seekpng.com/png/small/41-410093_circled-user-icon-user-profile-icon-png.png" class="rounded-circle user_img_msg">'+
								'</div>'+
								'<div class="msg_cotainer msg" style = " overflow-wrap: break-word;">'+data[index].message +
								'</div>'+
		    					'</div>';

                        
                        }
                    inside_counter++;
                    }else{
                        return;
                    }
                });
                if($private_chat.text() === ""){
                    $private_chat.empty();
                    $private_chat.append("send a message to "+the_receiver);

                }else if(counter < inside_counter){
                    $('#privateChat').empty();
                    $private_chat.append(html);
                    counter = inside_counter;
                    console.log("load up all messages");

                }else{
                    console.log("no need to upload new code");
                }
                
                console.log("this is the timer")
            },
            error: function(){
                console.log('error on chat page function');
            }
        });
        }, 10000);






 });
        


