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
              console.log(msg)
              var data = JSON.stringify(msg);
              var token = Object.keys(data)[0];
              var bearer = Object.keys(data)[2]
              console.log(data);
              console.log(token);
              console.log(bearer)

              console.log(bearer + " " + token)

              console.log(Object.values(msg)[0])
              console.log(Object.values(msg)[1])
              console.log(Object.values(msg)[2])
              console.log(Object.values(msg)[3])

              var bear = Object.values(msg)[1];
              var toke = Object.values(msg)[0];
              console.log(bear + " " + toke)
              var apiKey = "9a29535463e94dd284e033d5618eb1d5";

              $.ajax({
               type: 'GET',
               url: "https://www.bungie.net/Platform/User/GetCurrentBungieNetUser/",
               Authorization: bearer + " " + token,
               data: {
                "X-API-Key": apiKey
               }
              }).done(function(json){
               console.log(json.Response);
              });





            },
            error: function (errormessage) {
                console.log(errormessage)
            }
        });
  }
});
