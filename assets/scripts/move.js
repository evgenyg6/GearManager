$( document ).ready(function() {
  $(window).mousemove(function(event) {
    $(".move").css({
      "margin-left": -(event.pageX * 0.01),
      "margin-top": -(event.pageY * 0.01)
    });
    $(".moveGear").css({
      "margin-left": -(event.pageX * 0.02),
      "margin-top": -(event.pageY * 0.02)
    });
    $(".moveChar").css({
      "margin-left": -(event.pageX * 0.01),
      "margin-top": -(event.pageY * 0.01)
    });

});
});
