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

        $('<span>' + displayName + '</span>').addClass('displayName').appendTo('#container')
        getProfile(headers, getProfileURL, membershipType, membershipId);
      },
      error: function(err) {
        console.log(err);
      }
    })
  }

  function getProfile(headers, getProfileURL, type, id) {
    $.ajax({
      type: 'GET',
      headers: headers,
      url: getProfileURL,
      success: function(object) {
        console.log(object);
        var firstCharacter = object[Object.keys(object)[0]].profile.data.characterIds[0]
        var secondCharacter = object[Object.keys(object)[0]].profile.data.characterIds[1]
        var thirdCharacter = object[Object.keys(object)[0]].profile.data.characterIds[2]

        var currencyURL = 'https://www.bungie.net/Platform/Destiny2/' + type + '/Profile/' + id + '/?components=103'
        var characterURL = 'https://www.bungie.net/Platform/Destiny2/' + type + '/Profile/' + id + '/?components=200'
        getCharacters(headers, firstCharacter, secondCharacter, thirdCharacter, characterURL);
        getCurrency(headers, currencyURL)
      },
      error: function(err) {
        console.log(err);
      }
    })
  }

  function getCurrency(headers, currencyURL) {
    $.ajax({
      type: 'GET',
      headers: headers,
      url: currencyURL,
      success: function(object) {
        console.log(object);
        var glimmer = object[Object.keys(object)[0]].profileCurrencies.data.items[0].quantity
        var shard = object[Object.keys(object)[0]].profileCurrencies.data.items[1].quantity
        var brightdust = object[Object.keys(object)[0]].profileCurrencies.data.items[2].quantity

        $('<span>' + glimmer + '</span>').addClass('glimmer').appendTo('.nav');
        $('<span>' + shard + '</span>').addClass('shard').appendTo('.nav');
        $('<span>' + brightdust + '</span>').addClass('brightdust').appendTo('.nav');

      },
      error: function(err) {
        console.log(err);
      }
    })
  }

  function getCharacters(headers, firstCharacter, secondCharacter, thirdCharacter, characterURL) {
    var firstCharacterString = firstCharacter.toString();
    var secondCharacterString = secondCharacter.toString();
    var thirdCharacterString = thirdCharacter.toString();

    $.ajax({
      type: 'GET',
      headers: headers,
      url: characterURL,
      success: function(object) {
        characterEmblem(object, firstCharacterString, secondCharacterString, thirdCharacterString)
      },
      error: function(err) {
        console.log(err);
      }
    })
  }

  function characterEmblem(object, firstCharacterString, secondCharacterString, thirdCharacterString) {
    var firstEmblem = object[Object.keys(object)[0]].characters.data[firstCharacterString].emblemBackgroundPath
    var secondEmblem = object[Object.keys(object)[0]].characters.data[secondCharacterString].emblemBackgroundPath
    var thirdEmblem = object[Object.keys(object)[0]].characters.data[thirdCharacterString].emblemBackgroundPath

    var imageUrl1 = "https://www.bungie.net" + firstEmblem
    var imageUrl2 = "https://www.bungie.net" + secondEmblem
    var imageUrl3 = "https://www.bungie.net" + thirdEmblem
      /*var characterClass = classData.DestinyClassDefinition[2].json.displayProperties.name
      var characterRace = raceData.DestinyRaceDefinition[1].json.genderedRaceNames.Male*/

    for (let insideLoop = 0; insideLoop < Object.keys(raceData.DestinyRaceDefinition).length; insideLoop++) {
      if (object[Object.keys(object)[0]].characters.data[firstCharacterString].raceHash === raceData.DestinyRaceDefinition[insideLoop].json.hash) {
        let charRace1 = raceData.DestinyRaceDefinition[insideLoop].json.genderedRaceNames.Male
      }
    }

    for (let insideLoop = 0; insideLoop < Object.keys(classData.DestinyClassDefinition).length; insideLoop++) {
      if (object[Object.keys(object)[0]].characters.data[firstCharacterString].classHash === classData.DestinyClassDefinition[insideLoop].json.hash) {
        let charClass1 = classData.DestinyClassDefinition[insideLoop].json.displayProperties.name
      }
    }

    console.log(charClass1)

    $('<div/>').addClass('firstCharacter').css('background-image', 'url(' + imageUrl1 + ')').appendTo('#container');
    $('<span>' + characterClass + '</span>').addClass('classDefinition').appendTo('.firstCharacter');
    $('<span>' + charRace1 + '</span>').addClass('raceDefinition').appendTo('.firstCharacter');

    $('<div/>').addClass('secondCharacter').css('background-image', 'url(' + imageUrl2 + ')').appendTo('#container');
    $('<span>' + characterClass + '</span>').addClass('classDefinition').appendTo('.firstCharacter');
    $('<span>' + charRace1 + '</span>').addClass('raceDefinition').appendTo('.firstCharacter');

    $('<div/>').addClass('thirdCharacter').css('background-image', 'url(' + imageUrl3 + ')').appendTo('#container');
    $('<span>' + characterClass + '</span>').addClass('classDefinition').appendTo('.firstCharacter');
    $('<span>' + charRace1 + '</span>').addClass('raceDefinition').appendTo('.firstCharacter');




  }



});