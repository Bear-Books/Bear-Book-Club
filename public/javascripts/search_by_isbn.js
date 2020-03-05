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
                    posts +="<a href = '/Book?isbn="+d.isbn[0]+"'>";
                    for(i in d.author_name)
                        posts += d.author_name[i]+"<br/>";
                    posts += d.title+"<br/>";
                    posts += d.isbn[j] + "</a>  <br>";
                }
            }

            posts += "<br><br>";
            //posts += d.isbn.first() +"<br/>";
            
        });
        posts += "end of search results";
        $("#results").html(posts);
       });
    });
       
 });