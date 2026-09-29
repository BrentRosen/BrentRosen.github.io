document.getElementById('copyBtn').addEventListener('click', function () {
  var text = document.getElementById('email').textContent.trim();
  var msg = document.getElementById('copyMsg');
  function selectIt() {
    var r = document.createRange(); r.selectNodeContents(document.getElementById('email'));
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    msg.textContent = '[!] Email selected. Press Ctrl+C or Cmd+C to copy.';
  }
  try {
    navigator.clipboard.writeText(text).then(function () { msg.textContent = '[+] Copied to clipboard.'; }, selectIt);
  } catch (e) { selectIt(); }
});
