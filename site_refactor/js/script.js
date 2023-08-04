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

    var floaters = document.getElementsByClassName('floating');
    for (var i = 0; i < floaters.length; i++) {
        floaters[i].style.top = Math.random() * 100 + '%';
        floaters[i].style.left = Math.random() * 100 + '%';
    }
};
