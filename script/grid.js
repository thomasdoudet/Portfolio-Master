/**
 * Construction Grid — auto-injects on every page.
 * Include this script at the top of <body> on any page:
 *   <script src="script/grid.js"></script>          (from root)
 *   <script src="../script/grid.js"></script>       (from sub-folders)
 */
(function () {
    var g = document.createElement('div');
    g.className = 'grid-lines';
    g.setAttribute('aria-hidden', 'true');
    g.innerHTML =
        '<div class="grid-line" style="--line-pos:16.67%">' +
            '<span class="grid-num">01.</span>' +
            '<span class="grid-num grid-num--bottom">01.</span>' +
        '</div>' +
        '<div class="grid-line" style="--line-pos:33.33%">' +
            '<span class="grid-num">02.</span>' +
            '<span class="grid-num grid-num--bottom">02.</span>' +
        '</div>' +
        '<div class="grid-line" style="--line-pos:50%">' +
            '<span class="grid-num">03.</span>' +
            '<span class="grid-num grid-num--bottom">03.</span>' +
        '</div>' +
        '<div class="grid-line" style="--line-pos:66.67%">' +
            '<span class="grid-num">04.</span>' +
            '<span class="grid-num grid-num--bottom">04.</span>' +
        '</div>' +
        '<div class="grid-line" style="--line-pos:83.33%">' +
            '<span class="grid-num">05.</span>' +
            '<span class="grid-num grid-num--bottom">05.</span>' +
        '</div>' +
        '<div class="grid-corner grid-corner--tl"></div>' +
        '<div class="grid-corner grid-corner--tr"></div>' +
        '<div class="grid-corner grid-corner--bl"></div>' +
        '<div class="grid-corner grid-corner--br"></div>';

    document.body.insertBefore(g, document.body.firstChild);
}());
