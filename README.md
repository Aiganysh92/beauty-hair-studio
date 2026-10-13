# Beauty Hair Studio

A responsive landing page for a fictional hair salon, built as a front-end demo with plain HTML, CSS, and JavaScript — no frameworks, no build step, no backend.

## Features

- Responsive navigation bar with a mobile hamburger menu
- Hero, Services, About, and Contact sections
- Appointment booking form with client-side validation
- Login / Sign Up modal with client-side form validation
  - Accounts are stored in the browser's `localStorage`, not on a real server
  - Passwords are hashed (SHA-256) before being stored — there is still no real backend or database
- Scroll-based active-link highlighting and a "back to top" button

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (no dependencies)
- [Font Awesome](https://fontawesome.com/) (icons, via CDN)
- [Google Fonts](https://fonts.google.com/) — Playfair Display & Poppins (via CDN)

## Running Locally

No build tools or installation required. Pick any one of these options:

**Option 1 — Open directly**

Double-click `index.html`, or open it in your browser:

```bash
open index.html        # macOS
```

**Option 2 — Local web server (recommended)**

Some browsers restrict certain features when opening files directly via `file://`. Serving the folder avoids that:

```bash
# Using Python 3
python3 -m http.server 8000

# Then visit:
# http://localhost:8000
```

## Project Structure

```
beauty-hair-studio/
├── index.html    # Page markup and content
├── style.css     # Styling and layout
├── script.js     # Interactivity (nav, booking form, login/signup)
└── README.md
```

## Demo Disclaimer

This is a **front-end demo only**:

- The booking form does not send or save a real appointment.
- The login/signup form does not connect to a real authentication server — accounts exist only in your own browser's `localStorage` and are not shared or synced anywhere.

## License

This project is provided as-is for demonstration and educational purposes.
