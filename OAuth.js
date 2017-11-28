$(document).ready(function() {


  if (window.location.href.indexOf("code") > -1) {
      var url = window.location.href
      var OAuth= url.split('?code=')[1]
      var data = {
        grant_type: 'authorization_code',
        code: OAuth,
        client_id: '22868'
      }
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

    $.ajax({
            type: "POST",
            url: 'https://www.bungie.net/Platform/App/OAuth/Token/',
            data: data,
            contentType: "application/x-www-form-urlencoded", // this
            dataType: "json", // and this
            success: function (msg) {
              console.log(msg)
            },
            error: function (errormessage) {
                console.log(errormessage)
            }
        });
  }
});
