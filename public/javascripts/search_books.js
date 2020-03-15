$(document).ready(
    function() {

        var searchQ = window.location.href.slice(window.location.href.indexOf('?') + 1);
        $('#results').html(searchQ);

        $.getJSON('http://openlibrary.org/search.json?title='+searchQ, function(data) {

            $("#counter").text(data.docs.length +" results returned:");

            

        });

});