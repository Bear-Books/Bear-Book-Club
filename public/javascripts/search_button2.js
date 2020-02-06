$(document).ready(function() {
           
    $("#search_button").click(function(event){
        var searchBox = "";
        searchBox = $("#search_box").val();
       $.getJSON('http://openlibrary.org/search.json?title='+searchBox, function(data) {
        var posts = "";
        $("#counter").text(data.docs.length);
        var d = data.docs;
        d.forEach((d)=>{ 
            if(d.title)
                posts += d.title+"<br/>";

            
                                    
            if(d.author_name){

                for(j in d.author_name){
                    posts += d.author_name[j]+"<br/>";
                }
            }
            if(d.isbn)
                for(j in d.isbn){
                    posts += d.isbn[j] + "<br>";
                }
            posts += "<br><br>";
            //posts += d.isbn.first() +"<br/>";
            

        });
        $("#results").html(posts);
       });
    });
       
 });