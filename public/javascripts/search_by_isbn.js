$(document).ready(function() {
           
    $("#isbn_search_button").click(function(event){
        var searchBox = "";
        searchBox = $("#search_box").val();
       $.getJSON('http://openlibrary.org/search.json?q='+searchBox, function(data) {
        var posts = "";
        $("#counter").text(data.docs.length +" results returned:");
        var d = data.docs;
        d.forEach((d)=>{ 
            for(j in d.isbn){
                if(d.isbn[j] == searchBox){
                    posts += d.author_name[j]+"<br/>";
                    posts += d.title+"<br/>";
                    posts += d.isbn[j] + "<br>";
                }
            }

            posts += "<br><br>end of search results";
            //posts += d.isbn.first() +"<br/>";
            
        });
        $("#results").html(posts);
       });
    });
       
 });