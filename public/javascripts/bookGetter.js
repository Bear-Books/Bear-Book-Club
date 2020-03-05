$(document).ready(function() {

    //isbn taken from invisible paragraph, unsure how to 
    //directly take handlebars and input it as an argument

    console.log("started");
    var isbn = $("#page1").text();
    isbn = isbn.toString();

    //json page for information about specific book
    $.getJSON('https://openlibrary.org/api/books?bibkeys=ISBN:'+isbn+'&jscmd=data&format=json', function(data) {
        var posts = "<br/>";
        console.log(data);
        var f = "ISBN:";
        var res = f.concat(isbn);
        var d = data[res];

        //checks for a cover and returns a "small" cover
        if(d.cover){
            if(d.cover.small){
                console.log(d.cover.small);
                posts += "<img src = '"+d.cover.small+"'><br/>";
            }
        }else{
            posts += "no cover available<br/>";
        }

        //checks for a title and returns it
        if(d.title){
            console.log(d.title);
            console.log(d.by_statement);
            posts += d.title;
        }else{
            posts += "no title available<br/>";
        }

        //checks for an author and returns it
        if(d.authors){
            if(d.authors[0].name){
                console.log(d.authors[0].name);
                posts += " by "+d.authors[0].name+".<br/>";
            }
        }else{
            posts += "no authors available<br/>";
        }

        //checks for a publisher and returns it
        if(d.publishers){
            if(d.publishers[0].name){
                console.log(d.publishers[0].name);
                posts += "published by: "+d.publishers[0].name+"<br/>";
            }
        }else{
            posts += "no publishers available<br/>";
        }

        //checks for a publish date and returns it
        if(d.publish_date){
            console.log(d.publish_date);
            posts += "published: "+d.publish_date+"<br/>";
        }else{
            posts += "no publish date available<br/>";
        }

        //checks number of pages and returns it
        if(d.number_of_pages){
            console.log(d.number_of_pages);
            posts += "number of pages: "+d.number_of_pages+"<br/>";
        }else{
            posts += "number of pages not available<br/>";
        }

        //checks for weight of book and returns it
        if(d.weight){
            console.log(d.weight);
            posts += "weight of book: "+d.weight+"<br/>";
        }else{
            posts += "weight of book not available<br/>";
        }

        //returns string to Book.hbs, tester paragraph
        $("#tester").html(posts);

       });
       
 });