$(document).ready(function() {
    console.log( "ready!" );

    if (window.location.href.indexOf("code") > -1) {
      console.log("Authorization Code", window.location.pathname.split('=')[1]);
      window.location.replace("https://ilsilentii.github.io/GearManager/");
    }
});
