window.addEventListener('DOMContentLoaded', function() {
    adjustFooterPosition();
});

window.addEventListener('resize', function() {
    adjustFooterPosition();
});

window.addEventListener('reset', function() {
    adjustFooterPosition();
})

var windowHeight;
var contentHeight;
var footerHeight;

function adjustFooterPosition() {
    windowHeight = window.innerHeight;
    contentHeight = document.getElementById('content').offsetHeight;
    footerHeight = document.querySelector('.footer').offsetHeight;

    if ((contentHeight + footerHeight) >= windowHeight) {
        document.querySelector('.footer').style.position = 'static';
    } else {
        document.querySelector('.footer').style.position = 'fixed';
    }
}
