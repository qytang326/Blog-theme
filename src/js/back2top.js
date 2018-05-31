window.onscroll = function () {
    var goTop = document.getElementsByClassName("back2top");
    if (goTop.length > 0) {
        goTop[0].style.display = document.documentElement.scrollTop >= 300 || document.body.scrollTop >= 300 ? 'block' : 'none';
        goTop[0].onclick = function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
    }
};