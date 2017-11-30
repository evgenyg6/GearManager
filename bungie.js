$(document).ready(function() {
  var apiKey = "9a29535463e94dd284e033d5618eb1d5";

  if (window.location.href.indexOf("code") > -1) {
    var url = window.location.href
    var OAuth = url.split('?code=')[1]
    var data = {
      grant_type: 'authorization_code',
      code: OAuth,
      client_id: '22868',
      'X-API-Key': '9a29535463e94dd284e033d5618eb1d5'
    }

    $.ajax({
      type: 'GET',
      headers: {
        'X-API-Key': '9a29535463e94dd284e033d5618eb1d5'
      },
      url: "https://www.bungie.net/Destiny2/Manifest/",
      success: function(manifest) {
          console.log(manifest)
      },
      error: function(err) {
        console.log(err);
      }

    })

    $.ajax({
      type: "POST",
      url: 'https://www.bungie.net/Platform/App/OAuth/Token/',
      data: data,
      success: function(msg) {
        var accessToken = Object.values(msg)[0];
        const headers = {
          Authorization: 'Bearer ' + accessToken,
          'X-API-Key': apiKey
        };
        // Grabs MembershipsForCurrentUser using above token
        $.ajax({
          type: 'GET',
          headers: headers,
          url: "https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/",
          success: function(response) {
            let membershipType = response.Response.destinyMemberships[1].membershipType;
            let membershipId = response.Response.destinyMemberships[1].membershipId;
            let characterUrl = "https://www.bungie.net/Platform/Destiny2/" + membershipType + "/Profile/" + membershipId + "/?components=200";
            let characterInv = "https://www.bungie.net/Platform/Destiny2/" + membershipType + "/Profile/" + membershipId + "/?components=201"
            let characterEquip = "https://www.bungie.net/Platform/Destiny2/" + membershipType + "/Profile/" + membershipId + "/?components=205"
            let charItem = "https://www.bungie.net/Platform/Destiny2/" + membershipType + "/Profile/" + membershipId + "/6917529042933998211/" + "/?components=100";
            //let charTEST = "https://www.bungie.net/Platform/Destiny2/" + membershipType + "/Profile/" + membershipId + "/Character/?components=0"

            //console.log(response);
            //console.log(charTEST);

            // Grabs characterIds
            $.ajax({
              type: 'GET',
              headers: headers,
              url: characterUrl,
              success: function(response) {
                let charArray = [];
                //Grabs all character Ids in account, stores in array for selection later
                for (characters in response.Response.characters.data) {
                  charArray.push(response.Response.characters.data);
                }
                console.log(charArray);

                //console.log(response);

                // Grabs character inventory
                $.ajax({
                  type: 'GET',
                  headers: headers,
                  url: characterInv,
                  success: function(response) {
                    let invArray = [];
                    //Grabs character's ENTIRE inventory, stores in array for selection later
                    for (items in response.Response.characterInventories.data) {
                      invArray.push(response.Response.characterInventories.data[items]);

                    }
                    console.log(invArray);
                    //console.log(response);

                    // Grabs charater's EQUIPPED inventory, stores in array for selection later
                    $.ajax({
                      type: 'GET',
                      headers: headers,
                      url: characterEquip,
                      success: function(response) {
                        let equipArray = [];
                        //Grabs all character Ids in account, stores in array for selection later
                        for (items in response.Response.characterEquipment.data) {
                          equipArray.push(response.Response.characterEquipment.data[items]);

                        }
                        console.log(equipArray);
                        //console.log(response);
                      },
                      error: function(err) {
                        console.log(err);
                      }

                    })


                  },
                  error: function(err) {
                    console.log(err);
                  }

                })



              },
              error: function(err) {
                console.log(err);
              }

            })

          },
          error: function(err) {
            console.log(err);
          }

        })

      },
      error: function(errormessage) {
        console.log(errormessage)
      }
    });
  }

});
