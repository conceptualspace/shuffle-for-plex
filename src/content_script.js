

$(document).arrive(".PageHeaderBadge-badge-2oDBgn", function() {
    // selectors subject to change; working with web client v3.75.3
    let url = window.location.href.split('&');
    let sorted = false;
    let newUrl = url.map(function(param) {
        if (param.includes('sort=')) {sorted=true; return 'sort=random'} else {return param}
    }).join('&');

    if (!sorted) {
        newUrl += "&sort=random"
    }

    let a = document.createElement('a');
    let linkText = document.createTextNode(" 🎲 Shuffle");
    a.appendChild(linkText);
    a.title = "Sort the library randomly";
    a.href = newUrl;
    a.style.marginLeft = "25px";

    let headerBadgeNode = $(".PageHeaderBadge-badge-2oDBgn");
    headerBadgeNode[0].parentNode.insertBefore(a, headerBadgeNode.nextSibling);

});
