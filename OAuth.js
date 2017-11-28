$(document).ready(function() {
    console.log( "ready!" );

    if (window.location.href.indexOf("code") > -1) {
      var url = window.location.href
      var OAuth= url.split('?code=')[1]
      console.log(OAuth);
      //window.location.replace("https://ilsilentii.github.io/GearManager/");
    }
});
