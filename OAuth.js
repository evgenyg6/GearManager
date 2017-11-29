$(document).ready(function() {

function destiny() {
var apiKey = "9a29535463e94dd284e033d5618eb1d5";

$.ajax({
 url: "https://www.bungie.net/platform/Destiny2/Manifest/",
 headers: {
  "X-API-Key": apiKey
 }
}).done(function(json){
 console.log(json.Response);
});
}

  if (window.location.href.indexOf("code") > -1) {
      var url = window.location.href
      var OAuth= url.split('?code=')[1]
      var data = {
        grant_type: 'authorization_code',
        code: OAuth,
        client_id: '22868',
        'X-API-Key': '9a29535463e94dd284e033d5618eb1d5'
      }

    $.ajax({
            type: "POST",
            url: 'https://www.bungie.net/Platform/App/OAuth/Token/',
            data: data,
            success: function (msg) {
              console.log(msg)
              destiny();
            },
            error: function (errormessage) {
                console.log(errormessage)
            }
        });
  }
});
