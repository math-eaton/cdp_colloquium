  // Make divs draggable, floating, and randomly positioned
  $(function() {
    $(".draggable").each(function() {
      // Calculate random positions within a certain range
      var randomTop = Math.floor(Math.random() * 50);  // Random value from 0 to 50
      var randomLeft = Math.floor(Math.random() * 50);  // Random value from 0 to 50

      // Set the position
      $(this).css({
        'top': randomTop + 'vh',
        'left': randomLeft + 'vw'
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
      var leftDistance = $(this).offset().left;

      if (leftDistance < scrollLeft) {
        opacity = 1 - (scrollLeft - leftDistance) / windowWidth;
      } else {
        opacity = 1 - (leftDistance - scrollLeft) / windowWidth;
      }

      $(this).css('opacity', opacity);
    });
  });

  // Translate vertical scroll into horizontal scroll
  window.addEventListener("wheel", function(e) {
    e.preventDefault();
    window.scroll(window.scrollX + e.deltaY, 0);
  }, { passive: false });