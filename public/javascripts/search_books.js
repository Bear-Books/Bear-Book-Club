
$(document).ready(
    function() {

        var searchQ = window.location.href.slice(window.location.href.indexOf('?') + 1);
        var param = "undefined";
        var openLibQ1 = "";
        var openLibQ2 = "";
        if (searchQ.includes('&')) {

            searchQ = searchQ.slice(0,searchQ.indexOf('&'));
            param = window.location.href.slice(window.location.href.indexOf('&') + 1);
        }
        
        //console.log(searchQ);
        
        //console.log(param);

        var limit = 20;
        var output1 = '<div class="row"><div class="col"><a href="';
        var titleLink = "/books";

        var output2 = '" id="book_title_link"><img id="book_cover_link" class="img-fluid rounded mb-3 mb-md-0" src="';
        var coverlink = "";

        var output3 = '" alt=""></a></div><div class="col-3"><a href="';
        var titleLink = "";

        var output4 = '" id="book_title_link"><h3 id="book_title">';
        var title = "some title";

        var output5 = '</h3></a><p id="by_word">by </p><h6 id="book_author" style="color: black;">';
        var author = "";
        
        var output6 = '</h6></div><div class="col"><br><div class="btn btn-warning add-book" id="add_bookR';

        var output7 = '">Add To Reading List</div><br><br><div class="btn btn-success add-book" id="add_bookC'
        
        var output8 = '">Add to Completed List</div></div></div><hr>';

        var authorLink = "";
        var titleLink = "";
        var validBooks = [];
        
        if (param == "undefined") {
            openLibQ1 = 'https://openlibrary.org/search.json?q=';
            openLibQ2 = '&mode=everything&has_fulltext=true';
            console.log("this works");
        }
        else if (param == "numEd") {
            openLibQ1 = 'https://openlibrary.org/search.json?q=';
            openLibQ2 = '&sort=editions&mode=ebooks&has_fulltext=true';
        }
        else if (param == "earlPub") {
            openLibQ1 = 'https://openlibrary.org/search.json?q=';
            openLibQ2 = '&sort=old&mode=ebooks&has_fulltext=true';
        }
        else if (param == "recPub") {
            openLibQ1 = 'https://openlibrary.org/search.json?q=';
            openLibQ2 = '&sort=new&mode=ebooks&has_fulltext=true';
        }
        if (!window.location.href.includes("User")) {

            $.getJSON(openLibQ1+searchQ+openLibQ2, function(data) {

                $("#searchQ").text(searchQ.replace(/\+/g, " "));
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
                var counter = 0;
                for (const item of validBooks){
                    
                    try {
                        author = item.author_name.toString();
                        coverlink = "http://covers.openlibrary.org/b/id/" + item.cover_i.toString() + "-M.jpg";
                        
                    }
                    catch(e) {}
                    title = item.title.toString();
                    //console.log(coverlink);
                    $( "#full_search" ).append(output1+titleLink+output2+coverlink+output3+titleLink+output4+title+output5+author+output6+counter+output7+counter+output8);
                    counter++;
                }

                $(".add-book").click(function(event) {
                    
                    if (user_signed_in == true) {

                        var book_index = parseInt(event.target.id.slice(-1));
                        //console.log(event.target.id.slice(-2));
                        //console.dir(validBooks[book_index]);

                        // if user signed in:
                        if (event.target.id.slice(-2) == 'R0') {
                            
                             $.ajax({
                                    
                                url: '/updateUser/:'+global_user_name+':/rList',
                                type: 'POST',
                                dataType: 'json',
                                data: validBooks[book_index],
                                success: function (data) { 
                                    console.dir(data);
                                },
                                error:function (xhr, ajaxOptions, thrownError){
                                    if(xhr.status==404) {
                                        alert('status:' + xhr.status + ', status text: ' + xhr.statusText);
                                    }
                                    if(xhr.status==500) {
                                        alert('status:' + xhr.status + ', status text: ' + xhr.statusText);
                                    }
                                }
                            
                            });
                            alert("Added " + validBooks[book_index].title + " to Reading list");
                        }
                        else {
                            alert("Added " + validBooks[book_index].title + " to Completed list");
                        }
                    }
                    else {
                        alert("NOT SIGNED IN");
                    }
                   // else :

                });
                

                $("#rel").click(function() {

                    
                    window.open("/search?"+searchQ, "_self");
                }); 
        
                $("#numEd").click(function() {
        
                    window.open("/search?"+searchQ+"&numEd", "_self");
                }); 
        
                $("#earlPub").click(function() {
        
                    window.open("/search?"+searchQ+"&earlPub", "_self");
                }); 
        
                $("#recPub").click(function() {
        
                    window.open("/search?"+searchQ+"&recPub", "_self");
                }); 
            
        });
    }
});
