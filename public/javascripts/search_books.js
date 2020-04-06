$(document).ready(
    function() {

        var searchQ = window.location.href.slice(window.location.href.indexOf('?') + 1);
        var param = window.location.href.slice(window.location.href.indexOf('&') + 1);

        var limit = 20;
        var output1 = '<div class="row"><div class="col"><a href="';
        var titleLink = "/books";

        var output2 = '" id="book_title_link"><img id="book_cover_link" class="img-fluid rounded mb-3 mb-md-0" src="';
        var coverlink = "";

        var output3 = '" alt=""></a></div><div class="col-3"><a href="';
        var titleLink = "";

        var output4 = '" id="book_title_link"><h3 id="book_title">';
        var title = "some title";

        var output5 = '</h3><p id="by_word">by </p><h6 id="book_author"></h6>';
        var author = "";
        
        var output6 = '</h6></div><div class="col"><p ></p><a class="btn btn-warning" id="add_book" href="#">Add Book To Reading List</a></div></div><hr>';
        
        var authorLink = "";
        var titleLink = "";
        var validBooks = [];

        $.getJSON('https://openlibrary.org/search.json?q='+searchQ+'&mode=everything&has_fulltext=true', function(data) {

            $("#searchQ").text(searchQ.replace("+"," "));
  
            var books = data.docs;

            for (var i=0; i<data.numFound; i++) {
                
                try {
                    if (books[i].cover_i && books[i].isbn) {
                        validBooks.push(books[i]);
                    } 
                } catch (e) {}
                /*if (books[i].author_name) {
                   author = books[i].author_name.toString();
                }*/
                try {
                    if (validBooks.length == limit) {
                        break;
                    }
                } catch (e) {}
                //console.dir(author); 
            }
            $("#readingBearCon").remove();
            $("#full_search").css("opacity", 1);
            //console.dir(validBooks);
            validBooks.sort(function(a, b){
                
                return a.isbn.length - b.isbn.length;
            })
            validBooks.reverse();
            console.dir(validBooks);
            
            $("#num_results").text(validBooks.length);
            for (const item of validBooks){
                
                try {
                    author = item.author_name.toString();
                    coverlink = "http://covers.openlibrary.org/b/id/" + item.cover_i.toString() + "-M.jpg";
                }
                catch(e) {}
                title = item.title.toString();
                //console.log(coverlink);
                $( "#full_search" ).append(output1+titleLink+output2+coverlink+output3+titleLink+output4+title+output5+author+output6);
               
            }
            
        });
        
});
