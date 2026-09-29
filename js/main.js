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
/* ---------- boot sequence: type the hero commands, then reveal their output ---------- */
(function () {
  var body = document.querySelector('.hero .term-body');
  if (!body) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  var kids = Array.prototype.slice.call(body.children);
  kids.forEach(function (k) { k.classList.add('pending'); });
  var done = false;
  function finish() {
    if (done) return; done = true;
    kids.forEach(function (k) { k.classList.remove('pending'); });
    body.querySelectorAll('[data-type]').forEach(function (c) { c.textContent = c.getAttribute('data-type'); c.classList.remove('typing'); });
  }
  setTimeout(finish, 6000); // safety net: never leave the hero hidden
  function show(el) { el.classList.remove('pending'); el.classList.add('shown'); }
  function type(el, cb) {
    var text = el.getAttribute('data-type'), i = 0;
    el.textContent = ''; el.classList.add('typing');
    (function step() {
      if (done) return;
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(step, 45 + Math.random() * 55);
      else setTimeout(function () { el.classList.remove('typing'); cb(); }, 280);
    })();
  }
  var i = 0;
  function next() {
    if (done) return;
    if (i >= kids.length) { done = true; return; }
    var k = kids[i++]; show(k);
    var c = k.querySelector('[data-type]');
    if (c) type(c, next); else setTimeout(next, 110);
  }
  setTimeout(next, 250);
})();

/* ---------- interactive shell ---------- */
(function () {
  var out = document.getElementById('shellOut');
  var form = document.getElementById('shellForm');
  var input = document.getElementById('shellIn');
  var win = document.getElementById('shellWin');
  if (!out || !form || !input) return;

  var resumeLink = document.querySelector('a[href$="Brent_Rosen_Resume.pdf"]');
  var RESUME = resumeLink ? resumeLink.getAttribute('href') : 'Brent_Rosen_Resume.pdf';
  var LI = 'https://www.linkedin.com/in/brent-rosen/';
  var GH = 'https://github.com/BrentRosen/brentrosen.github.io';
  var EMAIL = 'brentrosen430@gmail.com';
  function a(href, label) { return '<a href="' + href + '" target="_blank" rel="noopener">' + label + '</a>'; }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var C = {
    help: {
      d: 'list available commands',
      r: function () {
        var rows = Object.keys(C).filter(function (k) { return !C[k].hidden; }).map(function (k) {
          return '  <span class="hl">' + (k + '            ').slice(0, 12) + '</span>' + C[k].d;
        });
        return 'Available commands:\n' + rows.join('\n') + '\n\n<span class="dim">Tip: use Tab to autocomplete and the arrow keys for history.</span>';
      }
    },
    whoami: { d: 'who I am, in one line', r: function () { return '<span class="hl">Brent Rosen</span>\nIT and cybersecurity student building toward a career in AI-driven security.\nM.S. AI Cybersecurity (exp. 05/2028) · B.S. Information Technology, Nova Southeastern University'; } },
    about: { d: 'a short introduction', r: function () { return "I have a B.S. in Information Technology from Nova Southeastern University, with minors in Cybersecurity and AI Application, and I'm now pursuing an M.S. in Artificial Intelligence Cybersecurity. I work as an IT intern, own security for a student platform, and am a member of NSU's eHackers cybersecurity club, which I served as vice president."; } },
    experience: { d: 'where I have worked', r: function () {
      return '<span class="good">● running</span>  <span class="hl">IT Intern</span>, Downtown Computer Services  <span class="dim">02/2025 → now</span>\n' +
        '<span class="dim">■ exited 0</span> <span class="hl">Project Assistant</span>, Nova Southeastern University  <span class="dim">02/2024 → 06/2024</span>\n' +
        '<span class="dim">■ exited 0</span> <span class="hl">Online Account Sales Manager</span>, Psycho Billy Records LLC  <span class="dim">05/2022 → 12/2023</span>\n\n' +
        '<span class="dim">Details: type </span><span class="hl">cd experience</span>'; } },
    projects: { d: 'projects and clubs', r: function () {
      return '<span class="hl">Project FinConnect</span>  <span class="dim">Security Owner · 11/2025 → now</span>\n  Authentication, access control, data privacy and moderation for an NSU student platform.\n' +
        '<span class="hl">eHackers Cybersecurity Club</span>  <span class="dim">08/2023 → now</span>\n  Vice president 08/2025 to 05/2026, now a member. Tech-Hub Hackathon 2024, NCL Fall 2024.'; } },
    labs: { d: 'hands-on cybersecurity labs', r: function () {
      return 'Platforms: <span class="hl">Immersive Labs</span>, <span class="hl">Cyber Range</span>\nTopics:    OSINT · password cracking · digital forensics · network traffic analysis (Wireshark, PCAPs)'; } },
    skills: { d: 'languages, tools and systems', r: function () {
      return '<span class="hl">os/</span>         Windows  Linux  macOS\n<span class="hl">languages/</span>  Python  Java  JavaScript  SQL  HTML  CSS\n<span class="hl">tools/</span>      Microsoft Office Suite  Tableau  ChatGPT  Wireshark\n<span class="hl">core/</span>       Networking  System administration  Technical support'; } },
    education: { d: 'degrees', r: function () {
      return '<span class="good">[in progress]</span> M.S. Artificial Intelligence Cybersecurity, NSU  <span class="dim">exp. 05/2028</span>\n<span class="dim">[complete]</span>    B.S. Information Technology, NSU  <span class="dim">05/2026</span>\n              Minors in Cybersecurity and AI Application'; } },
    awards: { d: 'CTF wins and honors', r: function () {
      return '<span class="warn">flag{1st_place_advanced_ctf_2025}</span>  SFISSA Hack the Flag, 1st place team\n<span class="warn">flag{nsls_nominee_2025}</span>            National Society of Leadership and Success, nominee'; } },
    contact: { d: 'how to reach me', r: function () {
      return 'email     <span class="hl">' + EMAIL + '</span>\nlinkedin  ' + a(LI, 'linkedin.com/in/brent-rosen') + '\n\n<span class="good">[+]</span> Open to internships and roles in IT and cybersecurity.'; } },
    resume: { d: 'open my resume (PDF)', r: function () { return 'resume.pdf → ' + a(RESUME, 'open Brent_Rosen_Resume.pdf'); } },
    linkedin: { d: 'my LinkedIn profile', r: function () { return a(LI, 'linkedin.com/in/brent-rosen'); } },
    github: { d: "this site's source code", r: function () { return a(GH, 'github.com/BrentRosen/brentrosen.github.io'); } },
    ls: { d: 'list files', r: function () { return '<span class="hl">awards/</span>  <span class="hl">labs/</span>  <span class="hl">projects/</span>  <span class="hl">skills/</span>  contact.sh  education.txt  experience.log  resume.pdf'; } },
    cd: { d: 'jump to a section, e.g. cd skills', r: function (arg) {
      var map = { experience: 'experience', 'experience.log': 'experience', projects: 'projects', labs: 'labs', skills: 'skills', education: 'education', 'education.txt': 'education', awards: 'awards', contact: 'contact', '~': 'top', '': 'top', '..': 'top', '/': 'top' };
      var id = map[(arg || '').replace(/\/$/, '')];
      if (!id) return 'bash: cd: ' + esc(arg) + ': No such file or directory';
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return '<span class="dim">→ ' + (id === 'top' ? '~' : id) + '</span>';
    } },
    cat: { hidden: true, d: '', r: function (arg) {
      var f = (arg || '').replace(/\/$/, '');
      var map = { 'experience.log': 'experience', 'education.txt': 'education', 'contact.sh': 'contact', 'resume.pdf': 'resume', awards: 'awards', labs: 'labs', projects: 'projects', skills: 'skills' };
      if (!f) return 'usage: cat &lt;file&gt;';
      return map[f] ? C[map[f]].r() : 'cat: ' + esc(f) + ': No such file or directory';
    } },
    history: { hidden: true, d: '', r: function () { return hist.map(function (h, i) { return '  ' + (i + 1) + '  ' + esc(h); }).join('\n') || ''; } },
    echo: { hidden: true, d: '', r: function (arg) { return esc(arg || ''); } },
    date: { hidden: true, d: '', r: function () { return esc(new Date().toString()); } },
    pwd: { hidden: true, d: '', r: function () { return '/home/brent'; } },
    sudo: { hidden: true, d: '', r: function () { return '<span class="warn">brent is not in the sudoers file. This incident will be reported.</span>'; } },
    rm: { hidden: true, d: '', r: function () { return '<span class="warn">rm: permission denied. Nice try.</span>'; } },
    exit: { hidden: true, d: '', r: function () { return 'logout\n<span class="dim">Just kidding. The session stays open. Scroll down to keep reading.</span>'; } },
    clear: { d: 'clear the screen', r: function () { out.innerHTML = ''; return null; } }
  };
  C.neofetch = { hidden: true, r: C.whoami.r };
  C.email = { hidden: true, r: C.contact.r }; C.cv = { hidden: true, r: C.resume.r };

  var hist = [], hi = 0;
  function print(html, cls) { var p = document.createElement('pre'); if (cls) p.className = cls; p.innerHTML = html; out.appendChild(p); }
  function run(raw) {
    var line = raw.trim();
    var echo = document.createElement('p'); echo.className = 'echo';
    echo.innerHTML = '<span class="ps">brent@rosen:<b>~</b><i>$</i></span> ';
    echo.appendChild(document.createTextNode(line));
    out.appendChild(echo);
    if (line) { hist.push(line); if (hist.length > 50) hist.shift(); }
    hi = hist.length;
    if (!line) { out.scrollTop = out.scrollHeight; return; }
    var parts = line.split(/\s+/), cmd = parts[0].toLowerCase(), arg = parts.slice(1).join(' ');
    var c = Object.prototype.hasOwnProperty.call(C, cmd) ? C[cmd] : null;
    var res;
    try { res = c ? c.r(arg) : 'bash: ' + esc(cmd) + ': command not found. Type <span class="hl">help</span> for a list of commands.'; }
    catch (e) { res = 'error: ' + esc(e.message); }
    if (res != null) print(res);
    out.scrollTop = out.scrollHeight;
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); run(input.value); input.value = ''; });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') { if (hi > 0) { hi--; input.value = hist[hi]; } e.preventDefault(); }
    else if (e.key === 'ArrowDown') { if (hi < hist.length - 1) { hi++; input.value = hist[hi]; } else { hi = hist.length; input.value = ''; } e.preventDefault(); }
    else if (e.key === 'Tab') {
      var v = input.value.trim().toLowerCase(); if (!v || v.indexOf(' ') > -1) return;
      var m = Object.keys(C).filter(function (k) { return !C[k].hidden && k.indexOf(v) === 0; });
      if (m.length === 1) { input.value = m[0] + ' '; e.preventDefault(); }
      else if (m.length > 1) { e.preventDefault(); print('<span class="dim">' + m.join('  ') + '</span>'); out.scrollTop = out.scrollHeight; }
    }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); out.innerHTML = ''; }
  });
  document.querySelectorAll('.shell-quick [data-cmd]').forEach(function (b) {
    b.addEventListener('click', function () { run(b.getAttribute('data-cmd')); });
  });
  out.addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    if (window.getSelection && String(window.getSelection())) return;
    input.focus({ preventScroll: true });
  });
})();
