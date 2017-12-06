$(document).ready(function() {
  var impact = 75
  var range = 57
  var stability = 82
  var handling = 46
  var reload = 37

  var impact1 = 29
  var range1 = 78
  var stability1 = 50
  var handling1 = 50
  var reload1 = 60

  $('#energy').on('mouseenter', function(e) {
    $('<div/>').addClass('gearContainer').appendTo('#container')
    $('<div/>').addClass('gearTitle').appendTo('.gearContainer')
    $('<div/>').addClass('gearProperties').appendTo('.gearContainer')
    $('<div/>').addClass('gearStats').appendTo('.gearContainer')

    $('<span>LAST HOPE</span>').addClass('gearName').appendTo('.gearTitle')
    $('<span>Sidearm</span>').addClass('gearType').appendTo('.gearTitle')
    $('<span>Legendary</span>').addClass('gearCommon').appendTo('.gearTitle')

    $('<span>Requires Level 20</span>').addClass('gearRequire').appendTo('.gearProperties')
    $('<img/>').attr('src', 'assets/media/images/arc_large.png').addClass('arcImage').appendTo('.gearProperties');
    $('<span>301</span>').addClass('attackValue').appendTo('.gearProperties')
    $('<span>ATTACK</span>').addClass('attack').appendTo('.gearProperties')
    $('<span>Remember what you fight for.</span>').addClass('gearDescription').appendTo('.gearProperties')
    $('<span>Impact</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Range</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Stability</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Handling</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Reload Speed</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Rounds Per Minute</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Magazine</span>').addClass('statProperty').appendTo('.gearStats')


    $('<div/>').addClass('impact').appendTo('.gearStats')
    $('<div/>').addClass('impactPercent').css({
      'position': 'absolute',

      'width': impact.toString() + "%",
      'height': '100%',
      'background-color': 'white',
    }).appendTo('.impact')

    $('<div/>').addClass('range').appendTo('.gearStats')
    $('<div/>').addClass('rangePercent').css({
      'position': 'absolute',

      'width': range.toString() + "%",
      'height': '100%',
      'background-color': 'white',
    }).appendTo('.range')

    $('<div/>').addClass('stability').appendTo('.gearStats')
    $('<div/>').addClass('stabilityPercent').css({
      'position': 'absolute',

      'width': stability.toString() + "%",
      'height': '100%',
      'background-color': 'white',
    }).appendTo('.stability')

    $('<div/>').addClass('handling').appendTo('.gearStats')
    $('<div/>').addClass('handlingPercent').css({
      'position': 'absolute',

      'width': handling.toString() + "%",
      'height': '100%',
      'background-color': 'white',
    }).appendTo('.handling')

    $('<div/>').addClass('reload').appendTo('.gearStats')
    $('<div/>').addClass('reloadPercent').css({
      'position': 'absolute',

      'width': reload.toString() + "%",
      'height': '100%',
      'background-color': 'white',
    }).appendTo('.reload')

    $('<span>491</span>').addClass('rpm').appendTo('.gearStats')
    $('<span>27</span>').addClass('magazine').appendTo('.gearStats')

    $('#energy').on('mousemove', function(e) {
      $('.gearContainer').css({
        'position': 'absolute',
        'width': '20%',
        'height': '50%',
        left: e.pageX + 50,
        top: e.pageY + 1
      })
    });
  });

  $('#energy').on('mouseleave', function(e) {
    $('.gearContainer').remove();
  });

  $('#kinetic').on('mouseenter', function(e) {
    $('<div/>').addClass('gearContainer').appendTo('#container')
    $('<div/>').addClass('gearTitle').appendTo('.gearContainer')
    $('<div/>').addClass('gearProperties').appendTo('.gearContainer')
    $('<div/>').addClass('gearStats').appendTo('.gearContainer')

    $('<span>ORIGIN STORY</span>').addClass('gearName').appendTo('.gearTitle')
    $('<span>Auto Rifle</span>').addClass('gearType').appendTo('.gearTitle')
    $('<span>Legendary</span>').addClass('gearCommon').appendTo('.gearTitle')

    $('<span>Requires Level 20</span>').addClass('gearRequire').appendTo('.gearProperties')
    $('<img/>').attr('src', 'assets/media/images/arc_large.png').addClass('arcImage').appendTo('.gearProperties');
    $('<span>277</span>').addClass('attackValue').appendTo('.gearProperties')
    $('<span>ATTACK</span>').addClass('attack').appendTo('.gearProperties')
    $('<span>Your inciting incident is their tragic ending.</span>').addClass('gearDescription').appendTo('.gearProperties')
    $('<span>Impact</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Range</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Stability</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Handling</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Reload Speed</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Rounds Per Minute</span>').addClass('statProperty').appendTo('.gearStats')
    $('<span>Magazine</span>').addClass('statProperty').appendTo('.gearStats')


    $('<div/>').addClass('impact').appendTo('.gearStats')
    $('<div/>').addClass('impactPercent').css({
      'position': 'absolute',

      'width': impact1.toString() + "%",
      'height': '100%',
      'background-color': 'white',
    }).appendTo('.impact')

    $('<div/>').addClass('range').appendTo('.gearStats')
    $('<div/>').addClass('rangePercent').css({
      'position': 'absolute',

      'width': range1.toString() + "%",
      'height': '100%',
      'background-color': 'white',
    }).appendTo('.range')

    $('<div/>').addClass('stability').appendTo('.gearStats')
    $('<div/>').addClass('stabilityPercent').css({
      'position': 'absolute',

      'width': stability1.toString() + "%",
      'height': '100%',
      'background-color': 'white',
    }).appendTo('.stability')

    $('<div/>').addClass('handling').appendTo('.gearStats')
    $('<div/>').addClass('handlingPercent').css({
      'position': 'absolute',

      'width': handling1.toString() + "%",
      'height': '100%',
      'background-color': 'white',
    }).appendTo('.handling')

    $('<div/>').addClass('reload').appendTo('.gearStats')
    $('<div/>').addClass('reloadPercent').css({
      'position': 'absolute',

      'width': reload1.toString() + "%",
      'height': '100%',
      'background-color': 'white',
    }).appendTo('.reload')

    $('<span>450</span>').addClass('rpm').appendTo('.gearStats')
    $('<span>32</span>').addClass('magazine').appendTo('.gearStats')

    $('#kinetic').on('mousemove', function(e) {
      $('.gearContainer').css({
        'position': 'absolute',
        'width': '20%',
        'height': '50%',
        left: e.pageX + 50,
        top: e.pageY + 1
      })
    });
  });

  $('#kinetic').on('mouseleave', function(e) {
    $('.gearContainer').remove();
  });









});