function openNav() {
  var nav = document.getElementById("mySidenav");

  if(nav.style.width == '15%')
  {
    nav.style.width = 0;
    dim(false);
  } 
  else {
    nav.style.width = "15%";
      dim(true);
} 


}

function dim(bool) {
  if (bool==false) { 
      document.getElementById("dimmer").style.display="block";
  }
  else{
    document.getElementById("dimmer").style.display="none";

  }

}  