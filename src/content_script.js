

$(document).arrive(".PageHeaderBadge-badge-2oDBgn", function() {
    // selectors subject to change; working with web client v4.2.1

    const url = window.location.href;
    const nonParams = url.slice(0, url.indexOf('?') + 1);
    const params = url.slice(url.indexOf('?') + 1).split('&');

    let newParams = params.map(function(param) {
        if (param.includes('sort=')) {
            return ''
        } else {
            return param
        }
    }).join('&');

    newParams += "&sort=random";
    let newUrl = nonParams + newParams;

    let a = document.createElement('a');
    let linkText = document.createTextNode(" 🎲 Shuffle");
    a.appendChild(linkText);
    a.title = "Sort the library randomly";
    a.href = newUrl;
    a.style.marginLeft = "25px";

    let headerBadgeNode = $(".PageHeaderBadge-badge-2oDBgn");
    headerBadgeNode[0].parentNode.insertBefore(a, headerBadgeNode.nextSibling);

});
