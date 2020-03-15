$(document).ready(function() {
           
    $("#title_search_button").click(function(event){
        //window.open('/search','_self');
        var searchBox = "";
        searchBox = $("#search_box").val();
        $.getJSON('http://openlibrary.org/search.json?title='+searchBox, function(data) {
        var posts = "";
        $("#counter").text(data.docs.length +" results returned:");
        var d = data.docs;
        d.forEach((d)=>{ 
            if(d.isbn){
                posts +="<a href = '/Book?isbn="+d.isbn[0]+"'>";
            }
            if(d.title)
                posts += d.title+"<br/>";

            
                                    
            if(d.author_name){

                for(j in d.author_name){
                    posts += d.author_name[j]+"<br/>";
                }
            }
            if(d.isbn)
                //for(j in d.isbn){
                    posts += d.isbn[0] + "</a><br>";
                //}
            posts += "<br><br>";
            //posts += d.isbn.first() +"<br/>";
            

        });
        $("#results").html(posts);
       });
    });
       
 });