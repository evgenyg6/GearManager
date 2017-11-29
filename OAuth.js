$(document).ready(function() {
  var apiKey = "9a29535463e94dd284e033d5618eb1d5";

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
              var accessToken = Object.values(msg)[0];

              const headers = {
                  Authorization: 'Bearer ' + accessToken,
                  'X-API-Key': apiKey
                };

          $.ajax({
               type: 'GET',
               headers: headers,
               url: "https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/",
               success: function(response) {
                 console.log(response);
                 console.log(response.destinyMemberships[1].membershipId);
                 console.log(response.destinyMemberships[1].membershipType);
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
