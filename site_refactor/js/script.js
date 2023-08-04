window.onload = function() {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        var parts = sections[i].getElementsByClassName('part');
        if (parts.length >= 2) {
            if (Math.random() < 0.5) {
                parts[0].classList.add('large');
                parts[0].style.textAlign = 'left';
                parts[1].style.textAlign = 'right';
            } else {
                parts[1].classList.add('large');
                parts[1].style.textAlign = 'left';
                parts[0].style.textAlign = 'right';
            }

            // Shuffle all child elements within the section
            var children = Array.from(sections[i].children);
            for (var j = 0; j < children.length; j++) {
                var randomIndex = Math.floor(Math.random() * children.length);
                children[j].parentNode.insertBefore(children[randomIndex], children[j]);
            }
        }
    }

    // assign floating parts to a random position within their div
    var floaters = document.getElementsByClassName('floating');
    for (var i = 0; i < floaters.length; i++) {
        floaters[i].style.top = Math.random() * 80 + '%'; // limit to 80%
        floaters[i].style.left = Math.random() * 80 + '%'; // limit to 80%

        // Random wobbling
        var duration = Math.random() * (8 - 3) + 3; // Random duration between 8 and 3 seconds
        var delay = Math.random() * 1; // Random delay up to 1 second
        floaters[i].style.animationDuration = duration + 's';
        floaters[i].style.animationDelay = delay + 's';
    }
    
    // After positioning the floating divs, draw the lines
    var floaters = document.getElementsByClassName('floating');
    var lineCanvas = document.getElementById('lineCanvas');
    var d = ''; // This will hold the data for the 'd' attribute of the path
    for (var i = 0; i < floaters.length; i++) {
        var rect = floaters[i].getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        if (i === 0) {
            // Move to the first point
            d += 'M ' + centerX + ' ' + centerY;
        } else {
            // Draw a cubic Bezier curve to the next point
            d += ' C ' + centerX + ' ' + centerY + ', ' + centerX + ' ' + centerY + ', ' + centerX + ' ' + centerY;
        }
    }
    // Create the path element and set its attributes
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    // path.setAttribute('stroke', '#eeff00');
    // path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', '#eeff00');
    path.setAttribute('fill-opacity', '0.3');

    // Add the path to the SVG
    lineCanvas.appendChild(path);
};

// make floaters draggable
$( function() {
    $( ".floating" ).draggable();
} );
