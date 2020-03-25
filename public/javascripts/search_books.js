$(document).ready(
    function() {

        var searchQ = window.location.href.slice(window.location.href.indexOf('?') + 1);
        var limit = 2;

        $.getJSON('http://openlibrary.org/search.json?q='+searchQ, function(data) {

            $("#num_results").text(data.numFound);
            $("#searchQ").text(searchQ.replace("+"," "));

            if (data.numFound < limit) {
                limit = data.numFound;
            }

            var books = data.docs;

            /* I need to loop through docs, use edition_count as my filter for the top 20*/

            for (var i=0; i<limit; i++) {
                
                $( "#full_search" ).append('<div class="row"><div class="col-md-7"><a href="#"><img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/200x300" alt=""></a></div><div class="col-md-5"><h3 id="author_name">David Noone</h3><p ></p><a class="btn btn-primary" href="#">Add Book To Reading List</a></div></div><hr>');
            }
            //d.forEach((d)=>{ 
                
                /*
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
                */
            //});
            //$("#results").html(posts);
            
            $("#readingBearCon").remove();
            $("#full_search").css("opacity", 1);
        });
        

});