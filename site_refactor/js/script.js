window.onload = function() {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        var parts = sections[i].getElementsByClassName('part');
        if (parts.length >= 2) {
            var textElements0 = parts[0].querySelectorAll(':scope > p, :scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6');
            var textElements1 = parts[1].querySelectorAll(':scope > p, :scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6');
            if (textElements0.length > 0 && textElements1.length > 0) {
                // Both parts contain a <p> or <h> element as a direct child, so randomly assign the "small" class to one part and the "large" class to the other part
                if (Math.random() < 0.5) {
                    parts[0].classList.add('small');
                    parts[0].classList.remove('large');
                    parts[0].style.textAlign = 'left';
                    parts[1].classList.add('large');
                    parts[1].classList.remove('small');
                    parts[1].style.textAlign = 'right';
                } else {
                    parts[0].classList.add('large');
                    parts[0].classList.remove('small');
                    parts[0].style.textAlign = 'right';
                    parts[1].classList.add('small');
                    parts[1].classList.remove('large');
                    parts[1].style.textAlign = 'left';
                }
            } else if (textElements0.length > 0) {
                // Only the first part contains a <p> or <h> element as a direct child, so give the "small" class to the first part and the "large" class to the second part
                parts[0].classList.add('small');
                parts[0].classList.remove('large');
                parts[0].style.textAlign = 'left';
                parts[1].classList.add('large');
                parts[1].classList.remove('small');
                parts[1].style.textAlign = 'right';
            } else {
                // Only the second part contains a <p> or <h> element as a direct child, or neither part contains a <p> or <h> element as a direct child, so give the "small" class to the second part and the "large" class to the first part
                parts[0].classList.add('large');
                parts[0].classList.remove('small');
                parts[0].style.textAlign = 'right';
                parts[1].classList.add('small');
                parts[1].classList.remove('large');
                parts[1].style.textAlign = 'left';
            }
        }

        // Shuffle all child elements within the section
        var children = Array.from(sections[i].children);
        for (var j = 0; j < children.length; j++) {
            var randomIndex = Math.floor(Math.random() * children.length);
            children[j].parentNode.insertBefore(children[randomIndex], children[j]);
        }
    }
    

    // assign floating parts to a random position within their div
    var floaters = document.getElementsByClassName('floating');
    for (var i = 0; i < floaters.length; i++) {
        floaters[i].style.top = Math.random() * 80 + '%'; // limit to 80%
        floaters[i].style.left = Math.random() * 80 + '%'; // limit to 80%
    }

    // make floaters draggable
    $( function() {
        $( ".floating" ).draggable();
    } );

    // randomly delay the start of floater wobbling animation
    var floaters = document.getElementsByClassName('floating');
    for (var i = 0; i < floaters.length; i++) {
        // Random wobbling
        var duration = Math.random() * (15 - 10) + 10; // Random duration between 10 and 20 seconds
        var delay = Math.random() * 1; // Random delay up to 1 second
        floaters[i].style.animationDuration = duration + 's';
        floaters[i].style.animationDelay = delay + 's';
    }

    // Create the SVG element
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.zIndex = '1000';
    svg.style.pointerEvents = 'none'; 
    document.body.appendChild(svg);

    // Create the line element
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    // line.setAttribute('fill', '#eeff00');
    // line.setAttribute('fill-opacity', '0.3');
    line.setAttribute('stroke', '#eeff00');
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);

 // Start the animation loop
requestAnimationFrame(function updateLines() {
    var floaters = document.getElementsByClassName('floating');
    var lines = svg.getElementsByTagName('line');
    
    // If there are not enough lines, create more
    while (lines.length < floaters.length - 1) {
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', '#eeff00');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
    }
    
    // Update the position of each line
    for (var i = 0; i < floaters.length - 1; i++) {
        var rect1 = floaters[i].getBoundingClientRect();
        var x1 = rect1.left + window.scrollX + rect1.width / 2;
        var y1 = rect1.top + window.scrollY + rect1.height / 2;
        
        var rect2 = floaters[i + 1].getBoundingClientRect();
        var x2 = rect2.left + window.scrollX + rect2.width / 2;
        var y2 = rect2.top + window.scrollY + rect2.height / 2;
        
        lines[i].setAttribute('x1', x1);
        lines[i].setAttribute('y1', y1);
        lines[i].setAttribute('x2', x2);
        lines[i].setAttribute('y2', y2);
    }
    
    // Call this function again on the next frame
    requestAnimationFrame(updateLines);
});

window.addEventListener('load', function() {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        var sectionHeight = sections[i].offsetHeight;
        var parts = sections[i].getElementsByClassName('part');
        for (var j = 0; j < parts.length; j++) {
            if (parts[j].offsetHeight > sectionHeight) {
                var scaleRatio = sectionHeight / parts[j].offsetHeight;
                parts[j].style.transform = 'scale(' + scaleRatio + ')';
            }
        }
    }
});

};


// make floaters draggable
$( function() {
    $( ".floating" ).draggable();
    $( ".bouncing" ).draggable();
} );

////// bouncer animation

// Array of image URLs
var images = [
    'assets/bouncing/18468.png',
    'assets/bouncing/39412.png',
    'assets/bouncing/84319.png',
    'assets/bouncing/119687.png',
    'assets/bouncing/159877.png',
    'assets/bouncing/167237.png',
    'assets/bouncing/173078.png',
    'assets/bouncing/182174.png',
  ];

document.addEventListener('DOMContentLoaded', function() {
    var sections = document.querySelectorAll('.section');
    var floatContainer = document.querySelector('.float-container');
    var bouncingContainers = document.getElementsByClassName('bouncing-container'); // Get elements by class name

    // Calculate the height based on the position of the float-container
    var height = 0;
    for (var i = 0; i < sections.length; i++) {
        if (sections[i] === floatContainer) break;
        height += sections[i].offsetHeight + 2; // 2 is for the top and bottom margin
    }

    // Loop through all bouncing containers
    for (var i = 0; i < bouncingContainers.length; i++) {
        var bouncingContainer = bouncingContainers[i];
        bouncingContainer.style.height = height + 'px';

        // Number of bouncing divs
        var numDivs = 5;

        // Create and animate the bouncing divs
        for (var j = 0; j < numDivs; j++) {
            var div = document.createElement('div');
            div.className = 'bouncing';
          
            // Choose a random image from the array
            var randomImage = images[Math.floor(Math.random() * images.length)];
          
            // Set the background image
            div.style.backgroundImage = 'url(' + randomImage + ')';
            div.style.backgroundSize = 'cover'; // Cover the entire div
          
            bouncingContainer.appendChild(div);
          
            // Initial position and velocity
            var x = Math.random() * window.innerWidth;
            var y = Math.random() * height; // Use the calculated height
            var vx = (Math.random() - 0.5) * .85;
            var vy = (Math.random() - 0.5) * .85;

            // Animate the div
            animateDiv(div, x, y, vx, vy, height); // Pass the calculated height
    }
}
});

function animateDiv(div, x, y, vx, vy, containerHeight) {
    // Update position
    x += vx;
    y += vy;
  
    // Get the width and height of the div
    var divWidth = div.offsetWidth;
    var divHeight = div.offsetHeight;
  
    // Check for collisions with the edges of the container
    if (x < 0 || x > window.innerWidth - divWidth) {
      vx = -vx;
    }
    if (y < 0 || y > containerHeight - divHeight) {
      vy = -vy;
    }
  
    // Apply the new position
    div.style.left = x + 'px';
    div.style.top = y + 'px';
  
    // Call this function again on the next frame
    requestAnimationFrame(function () {
      animateDiv(div, x, y, vx, vy, containerHeight);
    });
  }
  
  // URLs of the GIFs
const gifUrls = [
    'assets/gif/combined_inverted.gif',
    'assets/gif/area_inverted.gif',
    'assets/gif/point_inverted.gif',
    'assets/gif/polyline_inverted.gif',
  ];
  
  // Preload the GIFs and attach load event listeners
  let loadedCount = 0;
  gifUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === gifUrls.length) {
        // All GIFs have loaded, so display them
        displayGifs();
      }
    };
  });
  
  // Function to display the GIFs
  function displayGifs() {
    const gifs = document.querySelectorAll('.floating img');
    gifs.forEach(gif => {
      gif.style.visibility = 'visible'; // or gif.style.display = 'block';
    });
  }
  