window.addEventListener('resize', function() {
    adjustFooterPosition();
});

function adjustFooterPosition() {
    var windowHeight = window.innerHeight;
    var contentHeight = document.getElementById('content').offsetHeight;
    var footerHeight = document.querySelector('.footer').offsetHeight;

    if ((contentHeight + footerHeight) >= windowHeight) {
        document.querySelector('.footer').style.position = 'static';
    } else {
        document.querySelector('.footer').style.position = 'fixed';
    }
}

// Call the function initially
adjustFooterPosition();