function htmlScroll() {
    var top = document.body.scrollTop || document.documentElement.scrollTop;
    if (elFix.data_top < top) {
        elFix.style.position = 'fixed';
        elFix.style.top = 0;
        elFix.style.left = elFix.data_left;

        var fixFooter = document.getElementById("fixed-footer");
        fixFooter.style.visibility = "visible";
    }
    else {
        elFix.style.position = 'static';

        var fixFooter = document.getElementById("fixed-footer");
        fixFooter.style.visibility = "hidden";
    }
}

function htmlPosition(obj) {
    var o = obj;
    var t = o.offsetTop;
    var l = o.offsetLeft;
    while (o = o.offsetParent) {
        t += o.offsetTop;
        l += o.offsetLeft;
    }
    obj.data_top = t;
    obj.data_left = l;
}

var oldHtmlWidth = document.documentElement.offsetWidth;
window.onresize = function () {
    var newHtmlWidth = document.documentElement.offsetWidth;
    if (oldHtmlWidth == newHtmlWidth) {
        return;
    }
    oldHtmlWidth = newHtmlWidth;
    elFix.style.position = 'static';
    htmlPosition(elFix);
    htmlScroll();
}