var apiKey = "679daa7ce2064a26a887ae53bae16a61";

$.ajax({
  url:"https://www.bungie.net/Platform/App/GetAccessTokensFromCode/",
  type: POST,
  Host: www.bungie.net,
  Accept: application/json,
  Origin: "https://ilsilentii.github.io/Gear-Equipment-Manager/",
  'User-Agent': GearAndEquipmentManager,
  'Content-Length': 43,
  'X-API-Key': "679daa7ce2064a26a887ae53bae16a61",
  'Content-Type': application/json
}).done(function(json){
 console.log(json.Response.data.inventoryItem.itemName); //Gjallarhorn
});
