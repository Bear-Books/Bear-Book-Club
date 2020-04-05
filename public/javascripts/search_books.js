$(document).ready(
    function() {

        var searchQ = window.location.href.slice(window.location.href.indexOf('?') + 1);
        var limit = 20;
        var output1 = '<div class="row"><div class="col-md-7"><a href="#"><img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/200x300" alt=""></a></div><div class="col-md-5"><h3 id="author_name">'
        var output3 = '</h3><p ></p><a class="btn btn-primary" href="#">Add Book To Reading List</a></div></div><hr>';
        var author = "";
        var cover = "Default";
        var title = "some title";
        var validBooks = [];

        $.getJSON('https://openlibrary.org/search.json?q='+searchQ+'&mode=everything&has_fulltext=true', function(data) {

            $("#num_results").text(data.numFound);
            $("#searchQ").text(searchQ.replace("+"," "));
  
            var books = data.docs;

            for (var i=0; i<data.numFound; i++) {
                
                if (validBooks.length >= limit) {
                    break;
                }
                
                if (books[i].cover_i) {
                    validBooks.push(books[i]);
                }
                /*if (books[i].author_name) {
                   author = books[i].author_name.toString();
                }*/

                //$( "#full_search" ).append(output1 + author + output3);

                //console.dir(author); 
            }
            $("#readingBearCon").remove();
            $("#full_search").css("opacity", 1);
            console.dir(validBooks);
            validBooks.sort(function(a, b){
                return a.isbn.length - b.isbn.length;
            })
            console.dir(validBooks);
        });
        
});
