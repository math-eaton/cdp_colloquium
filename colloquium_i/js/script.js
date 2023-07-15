  // Make divs draggable, floating, and randomly positioned
  $(function()   {
  var horizontalSpacing = 10; // change this value to increase or decrease the horizontal spacing between divs
  var verticalRange = 10; // change this to increase or decrease the range of possible vertical positions

  $(".draggable").each(function(index) {
    // Calculate a random vertical position within the range
    var randomTop = Math.floor(Math.random() * verticalRange);

    // Calculate the left position based on the index of the div
    var leftPosition = index * horizontalSpacing;

    // Set the position
    $(this).css({
      'top': randomTop + 'vh',
      'left': leftPosition + 'vw'

      });
    });

    $(".draggable").draggable({
      start: function() {
        $(this).css("animation", "none");
      },
      stop: function() {
        $(this).css("animation", "float 5s ease-in-out infinite");
      }
    });
  });

  // Change opacity based on scroll position
  $(window).scroll(function() {
    var scrollLeft = $(this).scrollLeft(),
        windowWidth = $(this).width(),
        opacity;
  
    $('.draggable').each(function() {
      var leftDistance = $(this).offset().left,
          divWidth = $(this).width(),
          divCenter = leftDistance + (divWidth / 2),
          windowCenter = scrollLeft + (windowWidth / 2),
          distanceFromCenter = Math.abs(divCenter - windowCenter),
          maxDistance = windowWidth / 2,
          opacity;
  
      if (distanceFromCenter < maxDistance) {
        opacity = 1 - (distanceFromCenter / maxDistance);
      } else {
        opacity = 0;
      }
  
      $(this).css('opacity', opacity);
    });
  });

  // Translate vertical scroll into horizontal scroll
  window.addEventListener("wheel", function(e) {
    e.preventDefault();
    window.scroll(window.scrollX + e.deltaY, 0);
  }, { passive: false });