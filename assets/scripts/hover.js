$(document).ready(function(){
  $("#onHover")[0].volume = 1;
  $("#border").hide();
  $("#border2").hide();

  $(".character1").hover(
  function(){
  $("#border").toggle();
  });






    $(".character2").hover(
    function(){
      $("#border2").show();
      $("#onHover")[0].play();
    },
    function(){
      $("#border2").hide();});



});
