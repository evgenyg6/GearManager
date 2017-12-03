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

        authorize(data);


    }


    function authorize(data) {
        $.ajax({
            type: 'POST',
            url: 'https://www.bungie.net/Platform/App/OAuth/Token/',
            data: data,
            success: function(object) {
                const accessToken = Object.values(msg)[0];
                const headers = {
                    Authorization: 'Bearer ' + accessToken,
                    'X-API-Key': apiKey
                };
                currentUser(accessToken, headers);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }

    function currentUser(accessToken, headers) {
        $.ajax({
            type: 'GET',
            headers: headers,
            url: "https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/",
            success: function(object) {
                var membershipId = object[Object.keys(object)[0]].destinyMemberships[1].membershipId
                var membershipType = object[Object.keys(object)[0]].destinyMemberships[1].membershipType
                var getProfileURL = "https://www.bungie.net/Platform/Destiny2/" + membershipType + "/Profile/" + membershipId + "/?components=100"

                getProfile(getProfileURL);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }

    function getProfile(getProfileURL) {
        $.ajax({
            type: 'GET',
            headers: headers,
            url: getProfileURL,
            success: function(object) {
                console.log(object);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }




});