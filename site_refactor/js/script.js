window.onload = function() {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        var parts = sections[i].getElementsByClassName('part');
        if (Math.random() < 0.5) {
            parts[0].classList.add('one-third');
            parts[1].classList.add('two-thirds');
        } else {
            parts[0].classList.add('two-thirds');
            parts[1].classList.add('one-third');
            // Swap the content of the parts
            var temp = parts[0].innerHTML;
            parts[0].innerHTML = parts[1].innerHTML;
            parts[1].innerHTML = temp;
        }
    }
};