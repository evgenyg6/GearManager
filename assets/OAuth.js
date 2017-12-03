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
                const accessToken = Object.values(object)[0];
                const headers = {
                    Authorization: 'Bearer ' + accessToken,
                    'X-API-Key': apiKey
                };
                console.log(headers);
                getCurrentUser(headers);
                getCurrency(headers);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }

    function getCurrentUser(headers) {
        $.ajax({
            type: 'GET',
            headers: headers,
            url: "https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/",
            success: function(object) {
                console.log(object)
                var displayName = object[Object.keys(object)[0]].destinyMemberships[1].displayName
                var membershipId = object[Object.keys(object)[0]].destinyMemberships[1].membershipId
                var membershipType = object[Object.keys(object)[0]].destinyMemberships[1].membershipType
                var getProfileURL = "https://www.bungie.net/Platform/Destiny2/" + membershipType + "/Profile/" + membershipId + "/?components=100"

                $('<span>'+ displayName + '</span>').addClass('displayName').appendTo('#container')
                getProfile(headers, getProfileURL);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }

    function getProfile(headers, getProfileURL) {
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

    function getCurrency(headers) {
        $.ajax({
            type: 'GET',
            headers: headers,
            url: 'https://www.bungie.net/Platform/Destiny2/4/Profile/4611686018467569204/?components=103',
            success: function(object) {
                console.log(object);
                var glimmer = object[Object.keys(object)[0]].profileCurrencies.data.items[0].quantity
                var shard = object[Object.keys(object)[0]].profileCurrencies.data.items[1].quantity
                var brightdust = object[Object.keys(object)[0]].profileCurrencies.data.items[2].quantity
                console.log(glimmer);
                console.log(shard);
                console.log(brightdust);
                $('<span>'+ whatevertheobjectis + '</span>').addClass('glimmer').appendTo('.nav');
                $('<span>'+ whatevertheobjectis + '</span>').addClass('shard').appendTo('.nav');
                $('<span>'+ whatevertheobjectis + '</span>').addClass('brightdust').appendTo('.nav');

            },
            error: function(err) {
                console.log(err);
            }
        })
    }




});