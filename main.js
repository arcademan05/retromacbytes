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
var screenHeight;

function adjustFooterPosition() {
    screenHeight = window.screen.height;
    windowHeight = window.innerHeight;
    contentHeight = document.getElementById('content').clientHeight
    footerHeight = document.querySelector('.footer').clientHeight;

    if (contentHeight + footerHeight + 38 >= screenHeight || contentHeight + footerHeight + 38 >= windowHeight) {
        document.querySelector('.footer').style.position = 'static';
    } else {
        document.querySelector('.footer').style.position = 'fixed';
    }
    console.log('page adjusted');
}
