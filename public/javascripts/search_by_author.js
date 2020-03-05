$(document).ready(function() {
           
    $("#author_search_button").click(function(event){
        var searchBox = "";
        searchBox = $("#search_box").val();
       $.getJSON('http://openlibrary.org/search.json?author='+searchBox, function(data) {
        var posts = "";
        $("#counter").text(data.docs.length +" results returned:");
        var d = data.docs;
        d.forEach((d)=>{ 
           
                    if(d.isbn){
                        posts +="<a href = '/Book?isbn="+d.isbn[0]+"'>";
                    posts += d.title+"<br/>";
                    for(i in d.author_name)
                        posts += d.author_name[i]+"<br/>";
                    
                        posts += d.isbn[0] + "</a><br>";
                
            }

            posts += "<br><br>";
            //posts += d.isbn.first() +"<br/>";
            
        });
         posts += "end of search results";
        $("#results").html(posts);
       });
    });
       
 });