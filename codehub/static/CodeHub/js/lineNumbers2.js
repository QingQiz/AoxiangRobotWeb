let num = 0;
$('#code').each(function () {
    $(this).text().replace(/\n/g, function () {
        num++;
    });
    $(this).html('<table><tr><th><pre></pre></th><td><pre>' + $(this).html() + '</pre></td></table>')
});
$('th pre').each(function () {
    for (let i = 1; i <= num; ++i) {
        $(this).text($(this).text() + i + '\n');
    }
});
