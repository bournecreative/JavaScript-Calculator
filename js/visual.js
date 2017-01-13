function turnOffZoom () {
  $('#toggleBtn').click(function () {
    if ($(this).hasClass('fa-toggle-off')) {
      $(this).removeClass('fa-toggle-off').addClass('fa-toggle-on');
      $('.calculator').removeClass('grow');
    } else {
      $(this).removeClass('fa-toggle-on').addClass('fa-toggle-off');
      $('.calculator').addClass('grow');
    }
  })
}
  
$(document).ready(function(){
  turnOffZoom();
});