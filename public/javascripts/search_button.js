$(document).ready(
    function() {


        //takes the search bar value and puts it through
        //open librarys search api. returns title, author and isbn
        //of the books
    $("#search_bar").click(function(){
        $("#results").text("One Moment...");
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: 'http://openlibrary.org/search.json?title='+$("#search_box").val(),
            success: function (data) {

                var posts = "";
                $("#counter").text(data.docs.length);

                //sends back first element of array
                Object.defineProperty(Array.prototype, 'first', {
                    value() {
                      return this.find(e => true);     // or this.find(Boolean)
                    }
                  });

                  //loop to return title, authors, and first isbn number
                var d = data.docs;
                    d.forEach((d)=>{
                        posts += d.title+"<br/>";
                        for(j in d.author_name){
                            posts += d.author_name[j]+"<br/>";
                            posts += d.isbn.first()+"<br/><br/>";  
                        }
                        
                    });

                    //returns to index page
                $("#results").html(posts);
            }
        });
    });

});