$(document).ready(
    function() {

        var searchQ = window.location.href.slice(window.location.href.indexOf('?') + 1);
        $('#results').html(searchQ);
        var posts = "";

        $.getJSON('http://openlibrary.org/search.json?title='+searchQ, function(data) {

            $("#counter").text(data.docs.length +" results returned:");
            var d = data.docs;
            d.forEach((d)=>{ 
                
                if(d.isbn){
                    posts +="<a href = '/Book?isbn="+d.isbn[0]+"'>";
                }
                if(d.title) {
                    posts += d.title+"<br/>";
                }
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
            });
            $("#results").html(posts);

        });

});