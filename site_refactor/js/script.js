window.onload = function() {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        var parts = sections[i].getElementsByClassName('part');
        if (parts.length >= 2) {
            if (Math.random() < 0.5) {
                parts[0].classList.add('large');
            } else {
                parts[1].classList.add('large');
            }
        }
    }

    var floaters = document.getElementsByClassName('floating');
    for (var i = 0; i < floaters.length; i++) {
        floaters[i].style.top = Math.random() * 100 + '%';
        floaters[i].style.left = Math.random() * 100 + '%';
    }
};
