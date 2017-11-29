$(document).ready(function() {


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
              var bearer = Object.values(msg)[1];
              var token = Object.values(msg)[0];
              var apiKey = "9a29535463e94dd284e033d5618eb1d5";

              var user = {
                token_type: 'bearer'
                Authorization: token,
                'X-API-Key': '9a29535463e94dd284e033d5618eb1d5'
              }

              $.ajax({
               type: 'GET',
               data: user,
               url: "https://www.bungie.net/Platform/User/GetCurrentBungieNetUser/",
               success: function(response) {
                 console.log(response);
               },
               error: function(err) {
                 console.log(err);
               }
              })





            },
            error: function (errormessage) {
                console.log(errormessage)
            }
        });
  }
});
