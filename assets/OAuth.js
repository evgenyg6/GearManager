$(document).ready(function() {

  var apiKey = "9a29535463e94dd284e033d5618eb1d5";
  let accessToken;
  let headers;

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
        accessToken = Object.values(object)[0];
        headers = {
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
        let characterInv = "https://www.bungie.net/Platform/Destiny2/" + type + "/Profile/" + id + "/?components=201"
        let characterEquip = "https://www.bungie.net/Platform/Destiny2/" + type + "/Profile/" + id + "/?components=205"
        let characterVault = 'https://www.bungie.net/Platform/Destiny2/' + type + '/Profile/' + id + '/?components=102'
        getCharacters(headers, firstCharacter, secondCharacter, thirdCharacter, characterURL);
        getCurrency(headers, currencyURL);
        getCharacterEquip(headers, characterEquip, firstCharacter);
        /*getCharacterInv(headers, characterInv, firstCharacter);*/
        /*getCharacterVault(headers, characterVault);*/

        $("#equipMida").click(function() {
          equipItemMida(headers, firstCharacter, type);
        });

        $("#sendToVault").click(function() {
          transferItemOriginToVault(headers, firstCharacter, type)
        });

        $("#grabFromVault").click(function() {
          transferItemOriginFromVault(headers, firstCharacter, type)
        });

        $("#equipOriginStory").click(function() {
          equipItemOrigin(headers, firstCharacter, type)
        });

        $("#midaToVault").click(function() {
          transferItemMidaToVault(headers, firstCharacter, type)
        });

        $("#transferMIDA").click(function() {
          transferItemMidaFromVault(headers, firstCharacter, type)
        });

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
        console.log(object)
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

    var characterLevel1 = "level " + object[Object.keys(object)[0]].characters.data[firstCharacterString].baseCharacterLevel
    var characterLevel2 = "level " + object[Object.keys(object)[0]].characters.data[secondCharacterString].baseCharacterLevel
    var characterLevel3 = "level " + object[Object.keys(object)[0]].characters.data[thirdCharacterString].baseCharacterLevel

    var imageUrl1 = "https://www.bungie.net" + firstEmblem
    var imageUrl2 = "https://www.bungie.net" + secondEmblem
    var imageUrl3 = "https://www.bungie.net" + thirdEmblem

    var powerLevel1 = object[Object.keys(object)[0]].characters.data[firstCharacterString].light
    var powerLevel2 = object[Object.keys(object)[0]].characters.data[secondCharacterString].light
    var powerLevel3 = object[Object.keys(object)[0]].characters.data[thirdCharacterString].light


    let charRace1;
    let charClassl;
    let charClass2;
    let charClass3;

    for (let insideLoop = 0; insideLoop < Object.keys(raceData.DestinyRaceDefinition).length; insideLoop++) {
      if (object[Object.keys(object)[0]].characters.data[firstCharacterString].raceHash === raceData.DestinyRaceDefinition[insideLoop].json.hash) {
        charRace1 = raceData.DestinyRaceDefinition[insideLoop].json.genderedRaceNames.Male
      }
    }

    for (let insideLoop = 0; insideLoop < Object.keys(classData.DestinyClassDefinition).length; insideLoop++) {
      if (object[Object.keys(object)[0]].characters.data[firstCharacterString].classHash === classData.DestinyClassDefinition[insideLoop].json.hash) {
        charClass1 = classData.DestinyClassDefinition[insideLoop].json.displayProperties.name
      }
      if (object[Object.keys(object)[0]].characters.data[secondCharacterString].classHash === classData.DestinyClassDefinition[insideLoop].json.hash) {
        charClass2 = classData.DestinyClassDefinition[insideLoop].json.displayProperties.name
      }
      if (object[Object.keys(object)[0]].characters.data[thirdCharacterString].classHash === classData.DestinyClassDefinition[insideLoop].json.hash) {
        charClass3 = classData.DestinyClassDefinition[insideLoop].json.displayProperties.name
      }
    }

    $('<div/>').addClass('firstCharacter').css('background-image', 'url(' + imageUrl1 + ')').appendTo('#container');
    $('<span>' + charClass1 + '</span>').addClass('classDefinition').appendTo('.firstCharacter');
    $('<span>' + charRace1 + '</span>').addClass('raceDefinition').appendTo('.firstCharacter');
    $('<span>' + characterLevel1 + '</span>').addClass('level').appendTo('.firstCharacter');
    $('<span>' + powerLevel1 + '</span>').addClass('light').appendTo('.firstCharacter');

    $('<div/>').addClass('secondCharacter').css('background-image', 'url(' + imageUrl2 + ')').appendTo('#container');
    $('<span>' + charClass2 + '</span>').addClass('classDefinition').appendTo('.secondCharacter');
    $('<span>' + charRace1 + '</span>').addClass('raceDefinition').appendTo('.secondCharacter');
    $('<span>' + characterLevel2 + '</span>').addClass('level').appendTo('.secondCharacter');
    $('<span>' + powerLevel2 + '</span>').addClass('light').appendTo('.secondCharacter');

    $('<div/>').addClass('thirdCharacter').css('background-image', 'url(' + imageUrl3 + ')').appendTo('#container');
    $('<span>' + charClass3 + '</span>').addClass('classDefinition').appendTo('.thirdCharacter');
    $('<span>' + charRace1 + '</span>').addClass('raceDefinition').appendTo('.thirdCharacter');
    $('<span>' + characterLevel3 + '</span>').addClass('level').appendTo('.thirdCharacter');
    $('<span>' + powerLevel3 + '</span>').addClass('light').appendTo('.thirdCharacter');
  }

  // grabs items equipped on given character
  function getCharacterEquip(headers, characterEquip, firstCharacter) {
    var firstCharacterString = firstCharacter.toString();

    let equipName;
    let equipTier;
    let equipDesc;
    let eachItem;
    let equipIcon;
    let allEquipIcons = [];
    let allEquipTiers = [];
    let allEquipStats = [];
    let eachEquipStats = [];
    let allEquipNames = [];
    let allEquipDesc = [];

    $.ajax({
      type: 'GET',
      headers: headers,
      url: characterEquip,
      success: function(object) {
        //console.log(object);

        //TODO: CHANGE TO FOR LOOP BEFORE SORTING LIKE IN INV AND VAULT FUNCTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        var currentCharEquip = object[Object.keys(object)[0]].characterEquipment.data[firstCharacterString].items
          // for grabbing items with equip function
        console.log(currentCharEquip);
        // outside loop for user object
        for (let outsideLoop = 0; outsideLoop < currentCharEquip.length; outsideLoop++) {
          // filters out emotes and stuff you can't show stats for
          if (currentCharEquip[outsideLoop].itemInstanceId) {
            // inside loop for manifest
            for (let insideLoop = 0; insideLoop < Object.keys(itemData.DestinyInventoryItemDefinition).length; insideLoop++) {
              if (currentCharEquip[outsideLoop].itemHash === itemData.DestinyInventoryItemDefinition[insideLoop].json.hash && itemData.DestinyInventoryItemDefinition[insideLoop].json.equippable === true) {
                equipName = itemData.DestinyInventoryItemDefinition[insideLoop].json.displayProperties.name;
                allEquipNames.push(equipName);
                equipTier = itemData.DestinyInventoryItemDefinition[insideLoop].json.itemTypeAndTierDisplayName;
                allEquipTiers.push(equipTier);
                equipDesc = itemData.DestinyInventoryItemDefinition[insideLoop].json.displayProperties.description
                allEquipDesc.push(equipDesc);
                equipIcon = itemData.DestinyInventoryItemDefinition[insideLoop].json.displayProperties.icon;
                allEquipIcons.push(equipIcon);
                eachItem = itemData.DestinyInventoryItemDefinition[insideLoop].json.stats.stats
                eachEquipStats = []; //clear array of previous values
                // innerMostLoop for item stats
                for (items in eachItem) {

                  eachEquipStats.push(eachItem[items].value);
                }
                allEquipStats.push(eachEquipStats)
              }

            }
          }
        }

        var mida = 'https://www.bungie.net' + allEquipIcons[0]
          // for displaying items on page
        console.log(allEquipNames, allEquipTiers, allEquipDesc, allEquipStats, allEquipIcons);
        $('<div/>').attr('id', 'kinetic').addClass('kinetic moveGear').css('background-image', 'url(' + mida + ')').appendTo('#container');





      },
      error: function(err) {
        console.log(err);
      }
    })
  }
  // grabs inventory items on given character and builds them into divs
  function getCharacterInv(headers, characterInv, firstCharacter) {
    var firstCharacterString = firstCharacter.toString();
    let equipName;
    let equipTier;
    let equipDesc;
    let eachItem;
    let equipIcon;
    let sortedCharInv = [];
    let allInvTiers = [];
    let allInvStats = [];
    let eachEquipStats = [];
    let allInvIcons = [];
    let allInvNames = [];
    let allInvDesc = [];

    $.ajax({
      type: 'GET',
      headers: headers,
      url: characterInv,
      success: function(object) {
        //console.log(object);
        var firstCharacterInv = object[Object.keys(object)[0]].characterInventories.data[firstCharacterString].items
          //var secondCharacterInv = object[Object.keys(object)[0]].characterInventories.data[secondCharacterString].items
          //var thirdCharacterInv = object[Object.keys(object)[0]].characterInventories.data[thirdCharacterString].items

        for (items in firstCharacterInv) {
          // filters out emotes and stuff you can't display stats for
          if (firstCharacterInv[items].itemInstanceId) {
            sortedCharInv.push(firstCharacterInv[items]);
          }
        }
        // for grabbing items with equip function
        console.log(sortedCharInv);
        // outside loop for user object
        for (let outsideLoop = 0; outsideLoop < sortedCharInv.length; outsideLoop++) {
          // inside loop for manifest
          for (let insideLoop = 0; insideLoop < Object.keys(itemData.DestinyInventoryItemDefinition).length; insideLoop++) {
            if (sortedCharInv[outsideLoop].itemHash === itemData.DestinyInventoryItemDefinition[insideLoop].json.hash && itemData.DestinyInventoryItemDefinition[insideLoop].json.equippable === true) {
              equipName = itemData.DestinyInventoryItemDefinition[insideLoop].json.displayProperties.name;
              allInvNames.push(equipName);
              equipTier = itemData.DestinyInventoryItemDefinition[insideLoop].json.itemTypeAndTierDisplayName;
              allInvTiers.push(equipTier);
              equipDesc = itemData.DestinyInventoryItemDefinition[insideLoop].json.displayProperties.description
              allInvDesc.push(equipDesc);
              equipIcon = itemData.DestinyInventoryItemDefinition[insideLoop].json.displayProperties.icon;
              allInvIcons.push(equipIcon);
              eachItem = itemData.DestinyInventoryItemDefinition[insideLoop].json.stats.stats;
              eachEquipStats = []; //clear array of previous values
              // innerMostLoop for item stats
              for (items in eachItem) {

                eachEquipStats.push(eachItem[items].value);
              }
              allInvStats.push(eachEquipStats)
            }
          }
        }
        // for displaying the items on page
        console.log(allInvNames, allInvTiers, allInvDesc, allInvStats, allInvIcons);

        let space = 0;
        // Creates vault div and populates it with gear icons
        for (let numOfItems = 0; numOfItems < sortedCharInv.length; numOfItems++) {
          imageUrl = "https://www.bungie.net" + allInvIcons[numOfItems];
          itemName = allInvNames[numOfItems];
          itemTier = allInvTiers[numOfItems];
          itemDesc = allInvDesc[numOfItems];

          $('<img/>').attr({
            'src': imageUrl,
            'width': '10em',
            'height': '10em',
            'top': '5%',
            'left': space + "%"
          }).addClass('vaultInvIcons').appendTo('.invGear');

          space = space + 10

          $('<span>' + itemName + '</span>').addClass('itemName').appendTo('.invItemName');
          $('<span>' + itemTier + '</span>').addClass('itemTier').appendTo('.invItemTier');
          $('<span>' + itemDesc + '</span>').addClass('itemDesc').appendTo('.invItemDesc');


        }

        // Prints vault divs for content icons and name/tier
        $('<div/>').addClass('invDiv').css({
          'background-color': 'black',
          'position': 'absolute',
          'width': '50em',
          'height': '50em'
        }).appendTo('#container');

        $('<div/>').addClass('invGear').css({
          'background-color': 'grey',
          'position': 'absolute'
        }).appendTo('.invDiv');

        $('<div/>').addClass('invItemName').css({
          'background-color': 'grey',
          'position': 'absolute'
        }).appendTo('.invDiv');

        $('<div/>').addClass('invItemTier').css({
          'background-color': 'grey',
          'position': 'absolute'
        }).appendTo('.invDiv');

        $('<div/>').addClass('invItemDesc').css({
          'background-color': 'grey',
          'position': 'absolute'
        }).appendTo('.invDiv');


      },
      error: function(err) {
        console.log(err);
      }
    })
  }
  // grabs items in profile vault and builds them into divs
  function getCharacterVault(headers, characterVault) {
    let equipName;
    let equipTier;
    let equipIcon;
    let sortedVault = [];
    let allVaultNames = [];
    let allVaultTiers = [];
    let allVaultIcons = [];
    $.ajax({
      type: 'GET',
      headers: headers,
      url: characterVault,
      success: function(object) {
        //console.log(object);
        let userVault = object[Object.keys(object)[0]].profileInventory.data.items;
        for (items in userVault) {
          // filters out emotes and stuff you can't display stats for
          if (userVault[items].itemInstanceId) {
            sortedVault.push(userVault[items]);
          }
        }
        // for grabbing items with transfer function
        console.log(sortedVault);
        for (let outsideLoop = 0; outsideLoop < sortedVault.length; outsideLoop++) {
          for (let insideLoop = 0; insideLoop < Object.keys(itemData.DestinyInventoryItemDefinition).length; insideLoop++) {
            if (sortedVault[outsideLoop].itemHash === itemData.DestinyInventoryItemDefinition[insideLoop].json.hash) {
              equipName = itemData.DestinyInventoryItemDefinition[insideLoop].json.displayProperties.name;
              allVaultNames.push(equipName);
              equipTier = itemData.DestinyInventoryItemDefinition[insideLoop].json.itemTypeAndTierDisplayName;
              allVaultTiers.push(equipTier);
              equipIcon = itemData.DestinyInventoryItemDefinition[insideLoop].json.displayProperties.icon;
              allVaultIcons.push(equipIcon);
            }
          }
        }
        // for displaying the items on page
        console.log(allVaultNames, allVaultTiers, allVaultIcons);

        let imgUrl;
        let itemName;
        let itemTier;
        // Creates vault div and populates it with gear icons
        for (let numOfItems = 0; numOfItems < sortedVault.length; numOfItems++) {
          imageUrl = "https://www.bungie.net" + allVaultIcons[numOfItems];
          itemName = allVaultNames[numOfItems];
          itemTier = allVaultTiers[numOfItems];

          $('<img/>').attr({
            'src': imageUrl,
            'width': '10em',
            'height': '10em'
          }).addClass('vaultGearIcons').appendTo('.vaultGear');

          $('<span>' + itemName + '</span>').addClass('itemName').appendTo('.vaultItemName');
          $('<span>' + itemTier + '</span>').addClass('itemTier').appendTo('.vaultItemTier');

        }

        // Prints vault divs for content icons and name/tier
        $('<div/>').addClass('vaultDiv').css({
          'background-color': 'black',
          'position': 'absolute',
          'width': '50em',
          'height': '50em'
        }).appendTo('#container');

        $('<div/>').addClass('vaultGear').css({
          'background-color': 'grey',
          'position': 'absolute'
        }).appendTo('.vaultDiv');

        $('<div/>').addClass('vaultItemName').css({
          'background-color': 'grey',
          'position': 'absolute'
        }).appendTo('.vaultDiv');

        $('<div/>').addClass('vaultItemTier').css({
          'background-color': 'grey',
          'position': 'absolute'
        }).appendTo('.vaultDiv');



      },
      error: function(err) {
        console.log(err);
      }
    })
  }



  function equipItemMida(headers, firstCharacter, type) {
    let firstCharacterString = firstCharacter.toString();
    //selectedEquipItem;
    let equipItemToChar = {
      "itemId": '6917529043083550317',
      "characterId": firstCharacterString,
      "membershipType": type
    }

    $.ajax({
      type: 'POST',
      headers: headers,
      contentType: "json",
      data: JSON.stringify(equipItemToChar),
      url: "https://www.bungie.net/Platform/Destiny2/Actions/Items/EquipItem/",
      success: function(object) {
        console.log(object);

      },
      error: function(err) {
        console.log(err);
      }
    })
  }

  // TEMP HARDCODE: Equip MIDA Multi Tool
  function equipItemOrigin(headers, firstCharacter, type) {
    let firstCharacterString = firstCharacter.toString();
    //selectedEquipItem;
    let equipItemToChar = {
      "itemId": '6917529043811268471',
      "characterId": firstCharacterString,
      "membershipType": type
    }

    $.ajax({
      type: 'POST',
      headers: headers,
      contentType: "json",
      data: JSON.stringify(equipItemToChar),
      url: "https://www.bungie.net/Platform/Destiny2/Actions/Items/EquipItem/",
      success: function(object) {
        console.log(object);

      },
      error: function(err) {
        console.log(err);
      }
    })
  }
  // TEMP HARDCODE: Transfer MIDA To Vault
  function transferItemMidaToVault(headers, firstCharacter, type, sortedVault, sortedCharInv) {
    var firstCharacterString = firstCharacter.toString();
    //selectedTransferItem;
    let transferItem = {
      "itemReferenceHash": '1331482397',
      "stackSize": 1,
      "transferToVault": true,
      "itemId": '6917529043083550317',
      "characterId": firstCharacterString,
      "membershipType": type
    }
    $.ajax({
      type: 'POST',
      headers: headers,
      contentType: "json",
      data: JSON.stringify(transferItem),
      url: "https://www.bungie.net/Platform/Destiny2/Actions/Items/TransferItem/",
      success: function(object) {
        console.log(object);

      },
      error: function(err) {
        console.log(err);
      }
    })
  }

  // TEMP HARDCODE: Transfer MIDA From Vault
  function transferItemMidaFromVault(headers, firstCharacter, type, sortedVault, sortedCharInv) {
    var firstCharacterString = firstCharacter.toString();
    //selectedTransferItem;
    let transferItem = {
      "itemReferenceHash": '1331482397',
      "stackSize": 1,
      "transferToVault": false,
      "itemId": '6917529043083550317',
      "characterId": firstCharacterString,
      "membershipType": type
    }
    $.ajax({
      type: 'POST',
      headers: headers,
      contentType: "json",
      data: JSON.stringify(transferItem),
      url: "https://www.bungie.net/Platform/Destiny2/Actions/Items/TransferItem/",
      success: function(object) {
        console.log(object);

      },
      error: function(err) {
        console.log(err);
      }
    })
  }

  // TEMP HARDCODE: Transfer Origin Story To Vault
  // TEMP HARDCODE: Transfer Origin Story To Vault
  function transferItemOriginToVault(headers, firstCharacter, type) {
    var firstCharacterString = firstCharacter.toString();
    let transferItem = {
      "itemReferenceHash": '1644162710',
      "stackSize": 1,
      "transferToVault": true,
      "itemId": '6917529043811268471',
      "characterId": firstCharacterString,
      "membershipType": type
    }
    $.ajax({
      type: 'POST',
      headers: headers,
      contentType: "json",
      data: JSON.stringify(transferItem),
      url: "https://www.bungie.net/Platform/Destiny2/Actions/Items/TransferItem/",
      success: function(object) {
        console.log(object);

      },
      error: function(err) {
        console.log(err);
      }
    })
  }

  // TEMP HARDCODE: Transfer Origin Story From Vault
  // TEMP HARDCODE: Transfer Origin Story From Vault
  function transferItemOriginFromVault(headers, firstCharacter, type) {
    var firstCharacterString = firstCharacter.toString();
    let transferItem = {
      "itemReferenceHash": '1644162710',
      "stackSize": 1,
      "transferToVault": false,
      "itemId": '6917529043811268471',
      "characterId": firstCharacterString,
      "membershipType": type
    }

    $.ajax({
      type: 'POST',
      headers: headers,
      contentType: "json",
      data: JSON.stringify(transferItem),
      url: "https://www.bungie.net/Platform/Destiny2/Actions/Items/TransferItem/",
      success: function(object) {
        console.log(object);

      },
      error: function(err) {
        console.log(err);
      }
    })
  }



});