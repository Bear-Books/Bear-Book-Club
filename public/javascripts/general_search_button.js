$(document).ready(
    function() {
    
    $("#general_search_button").click(function() {
        
        var searchQ = "/search?" + $(".search_input").val();
        searchQ1 = searchQ.replace(/ /g, '+');
        window.open(searchQ1, "_self");
    });

    $('.search_input').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $("#general_search_button").click();//Trigger search button click event
        }
    });
});