function openUserPage() {
    const googleUser = gapi.auth2.getAuthInstance().currentUser.get();

    var profile = googleUser.getBasicProfile();

    var searchQ = "/User?"+profile.getName();
    searchQ1 = searchQ.replace(/ /g, '+');

    window.open(searchQ1, "_self");


    var searchQue = window.location.href.slice(window.location.href.indexOf('?') + 1);
    searchQue.replace("+"," ");
    console.log(searchQue);

    
    
}