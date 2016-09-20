var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

//document.addEventListener("DOMContentLoaded", init, false);

window.onload = function init()
{
    var codeblock = document.querySelectorAll("pre code");

    if(codeblock.length)
    {
        for(var i=0, len=codeblock.length; i<len; i++)
        {
            var dom = codeblock[i];
            var html = dom.innerHTML;
            html = escapeHtml(html);
            dom.innerHTML = html;
        }
    }
}
