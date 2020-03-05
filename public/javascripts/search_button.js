$(document).ready(
    function() {

    $("#search_button").click(function(){
        $("#results").text("One Moment...");
        var searchBox = "";
        searchBox = $("#search_box").val();
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: 'http://openlibrary.org/search.json?q='+searchBox,
            success: function (data) {

                var posts = "";
                $("#counter").text(data.docs.length);

                //sends back first element of array
                /*Object.defineProperty(Array.prototype, 'first', {
                    value() {
                      return this.find(e => true);     // or this.find(Boolean)
                    }
                  });*/

                  //loop to return title, authors, and first isbn number
                var d = data.docs;
                
                    d.forEach((d)=>{ 
                    	if(d.title)
                             posts += d.title+"<br/>";

                        if(d.author_name){
                            for(j in d.author_name){
                                posts += d.author_name[j]+"<br/>";
                            }
                        }/*
                        if(d.isbn)
                            for(j in d.isbn){
                                posts += d.isbn[j] + "<br>";
                            }*/
                        posts += "<br><br>";
                        

                    });

                    //returns to index page
                $("#results").html(posts);
            }
        });
    });

});