$(document).ready(
    function() {

/*
    $("#search_bar").click(function(){
        var str = $("#search_box").val();
        alert(str);
        $("#results").append("yes");
    });
    */

    $("#search_bar").click(function(){
        $("#results").text("One Moment...");
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: 'http://openlibrary.org/search.json?q='+$("#search_box").val(),
            success: function (data) {
                var posts = "";
                $("#counter").text(data.docs.length);
                for(var i = 0; i < data.docs.length; i++){
                    //alert(data.docs[i].title);
                    //i += i;<img src="http://covers.openlibrary.org/b/isbn/9780385533225-S.jpg" />   
                    posts += "<br/><br/>"+data.docs[i].title+"<br/>";                 
                    posts += data.docs[i].isbn[0]+"<br/>";
                    if($("img").length){
                        posts += "<img src='http://covers.openlibrary.org/b/isbn/"+data.docs[i].isbn[0]+"-S.jpg'/>";
                    } else {
                        posts += "<img src='http://i.imgur.com/J5LVHEL.jpg'/>";
                    }     
                }

                $("#results").html(posts);
            }
        });
    });

});