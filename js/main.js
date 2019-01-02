$(function($) {
    $(document).on('click', '.box-btn', function(event) {
      $(this).find('.glyphicon').toggleClass('red').toggleClass('glyphicon-heart-empty glyphicon-heart');
    });
  });