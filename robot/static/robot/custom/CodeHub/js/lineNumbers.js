$(document).ready(function() {
  $('#code').each(function() {
    $(this).html('<table><tr><th></th><td><pre>' + $(this).html().replace(/\n/g,'\n</pre></td><tr><th></th><td><pre>') + '\n</pre></td></tr></table>');
  });
  var ln = 1;
  $('th').each(function() {
    $(this).text(ln);
    ln = ln + 1;
  })
})
