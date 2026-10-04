<div align="center">

```
brent@rosen:~$ whoami
```

# Brent Rosen

**IT & cybersecurity student** · M.S. Artificial Intelligence Cybersecurity @ Nova Southeastern University

[![Website](https://img.shields.io/badge/site-brentrosen.is--a.dev-3fd6c4?style=for-the-badge&logo=gnubash&logoColor=white&labelColor=070d12)](https://brentrosen.is-a.dev/)
[![Source code](https://img.shields.io/badge/source-BrentRosen%2Fbrentrosen.github.io-181717?style=for-the-badge&logo=github&logoColor=white&labelColor=070d12)](https://github.com/BrentRosen/brentrosen.github.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-brent--rosen-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=070d12)](https://www.linkedin.com/in/brent-rosen/)
[![Resume](https://img.shields.io/badge/resume-PDF-f2a33a?style=for-the-badge&logo=adobeacrobatreader&logoColor=white&labelColor=070d12)](https://brentrosen.github.io/assets/Brent_Rosen_Resume.pdf)

</div>

---

> 🌐 **Live site:** [brentrosen.is-a.dev](https://brentrosen.is-a.dev/)
>
> 💾 **Source code:** this repo, [`BrentRosen/brentrosen.github.io`](https://github.com/BrentRosen/brentrosen.github.io)

This repository holds all of the source code for my personal portfolio. GitHub Pages builds the live site at **[brentrosen.is-a.dev](https://brentrosen.is-a.dev/)** straight from this repo. It's a single-page site styled like a terminal session. It boots up with a typing intro and includes a working interactive shell: type `help` to explore.

## `$ neofetch --short`

| | |
|---|---|
| **location** | Fort Lauderdale, FL |
| **current** | IT Intern @ Downtown Computer Services |
| **studying** | M.S. AI Cybersecurity, NSU (exp. 05/2028) · B.S. Information Technology, NSU (05/2026) |
| **ctf** | 🚩 1st place, SFISSA Hack the Flag 2025 (Advanced CTF) |
| **project** | Security Owner, Project FinConnect (auth, privacy & moderation) |
| **labs** | Immersive Labs, Cyber Range: OSINT, password cracking, digital forensics, network traffic analysis (Wireshark, PCAPs) |

## `$ tree -L 2`

```
.
├── index.html            # the portfolio page
├── css/style.css         # terminal theme (dark-first, with a light variant)
├── js/main.js            # boot-up typing intro, interactive shell, copy-email button
├── resume/index.html     # web version of my resume (print-ready)
├── assets/
│   ├── Brent_Rosen_Resume.pdf
│   └── favicon.svg
├── 404.html              # "command not found" page
├── robots.txt
└── sitemap.xml
```

## `$ cat stack.txt`

- Plain **HTML, CSS and JavaScript**. No framework and no build step needed to serve it.
- Fonts: JetBrains Mono and IBM Plex Sans (Google Fonts).
- Responsive down to phone width, respects dark/light mode and `prefers-reduced-motion`.
- The resume PDF is generated from `resume/index.html` with headless Chromium (`--print-to-pdf`).

## `$ ./run-locally.sh`

```bash
git clone https://github.com/BrentRosen/brentrosen.github.io
cd brentrosen.github.io
python3 -m http.server 8000   # then open http://localhost:8000
```

## `$ ./contact.sh`

Open to internships and roles in IT and cybersecurity.
📧 brentrosen430@gmail.com · 🔗 [linkedin.com/in/brent-rosen](https://www.linkedin.com/in/brent-rosen/)

---

<sub>© 2026 Brent Rosen. Site content (text, resume) is mine. Feel free to borrow ideas from the code.</sub>
