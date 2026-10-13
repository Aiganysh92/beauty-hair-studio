// =========================================================
// Beauty Hair Studio — script.js
// Handles: mobile nav menu, active link highlight,
//          back-to-top button, and booking form validation.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------
     1. Mobile navigation menu (hamburger toggle)
  --------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  // Close the mobile menu whenever a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------
     2. Highlight the active nav link while scrolling
  --------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  function highlightActiveLink() {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.id;
      }
    });

    navItems.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSectionId}`);
    });
  }

  /* ---------------------------------------------------
     3. Show / hide the "back to top" button
  --------------------------------------------------- */
  const backToTop = document.getElementById("backToTop");

  function toggleBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 400);
  }

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Run scroll-related checks together for performance
  window.addEventListener("scroll", () => {
    highlightActiveLink();
    toggleBackToTop();
  });

  // Run once on load in case the page is reloaded mid-scroll
  highlightActiveLink();
  toggleBackToTop();

  /* ---------------------------------------------------
     4. Auto-update the footer copyright year
  --------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------------------------------------------
     5. Prevent picking a date before today in the booking form
  --------------------------------------------------- */
  const dateInput = document.getElementById("appointmentDate");
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.setAttribute("min", `${yyyy}-${mm}-${dd}`);
  }

  /* ---------------------------------------------------
     6. Booking form validation + confirmation message
     (Front-end demo only — nothing is actually sent or saved)
  --------------------------------------------------- */
  const bookingForm = document.getElementById("bookingForm");
  const formFeedback = document.getElementById("formFeedback");

  // Simple phone check: at least 7 digits, allows spaces/()/-/+
  function isValidPhone(value) {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.length >= 7;
  }

  // Shows/clears an error message under a given field
  function setFieldError(inputEl, errorEl, message) {
    const group = inputEl.closest(".form-group");
    if (message) {
      group.classList.add("invalid");
      errorEl.textContent = message;
    } else {
      group.classList.remove("invalid");
      errorEl.textContent = "";
    }
  }

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault(); // stop the page from reloading
    formFeedback.textContent = "";
    formFeedback.className = "form-feedback";

    const nameInput = document.getElementById("customerName");
    const phoneInput = document.getElementById("phoneNumber");
    const serviceInput = document.getElementById("serviceSelect");
    const timeInput = document.getElementById("appointmentTime");

    let isFormValid = true;

    // Name: required, at least 2 characters
    if (nameInput.value.trim().length < 2) {
      setFieldError(nameInput, document.getElementById("nameError"), "Please enter your full name.");
      isFormValid = false;
    } else {
      setFieldError(nameInput, document.getElementById("nameError"), "");
    }

    // Phone: required, valid-looking number
    if (!isValidPhone(phoneInput.value)) {
      setFieldError(phoneInput, document.getElementById("phoneError"), "Please enter a valid phone number.");
      isFormValid = false;
    } else {
      setFieldError(phoneInput, document.getElementById("phoneError"), "");
    }

    // Service: must be selected
    if (!serviceInput.value) {
      setFieldError(serviceInput, document.getElementById("serviceError"), "Please select a service.");
      isFormValid = false;
    } else {
      setFieldError(serviceInput, document.getElementById("serviceError"), "");
    }

    // Date: required and cannot be in the past
    const dateError = document.getElementById("dateError");
    if (!dateInput.value) {
      setFieldError(dateInput, dateError, "Please choose a date.");
      isFormValid = false;
    } else {
      const chosenDate = new Date(dateInput.value + "T00:00:00");
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);

      if (chosenDate < todayMidnight) {
        setFieldError(dateInput, dateError, "Please choose today or a future date.");
        isFormValid = false;
      } else {
        setFieldError(dateInput, dateError, "");
      }
    }

    // Time: required
    if (!timeInput.value) {
      setFieldError(timeInput, document.getElementById("timeError"), "Please choose a time.");
      isFormValid = false;
    } else {
      setFieldError(timeInput, document.getElementById("timeError"), "");
    }

    if (!isFormValid) {
      formFeedback.textContent = "Please fix the highlighted fields and try again.";
      formFeedback.classList.add("error");
      return;
    }

    // All good — show a demo confirmation message.
    // NOTE: this is a front-end only demo. No server, database, or email
    // is involved, so nothing is actually booked, saved, or sent anywhere.
    formFeedback.textContent =
      `Thank you, ${nameInput.value.trim()}! Your request for "${serviceInput.value}" on ` +
      `${dateInput.value} at ${timeInput.value} has been noted on this page. ` +
      `(Demo only — no real appointment has been booked.)`;
    formFeedback.classList.add("success");

    bookingForm.reset();
    dateInput.setAttribute("min", dateInput.getAttribute("min")); // keep the min date after reset
  });

  /* ---------------------------------------------------
     7. Login / Sign Up
     (Front-end demo only — accounts live in localStorage
     on this browser, there is no real server or database.)
  --------------------------------------------------- */
  const USERS_KEY = "bhsUsers";
  const SESSION_KEY = "bhsSession";

  const authOverlay = document.getElementById("authOverlay");
  const authNavItem = document.getElementById("authNavItem");
  const tabLogin = document.getElementById("tabLogin");
  const tabSignup = document.getElementById("tabSignup");
  const authModalTitle = document.getElementById("authModalTitle");
  const authClose = document.getElementById("authClose");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  }

  function setSession(user) {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
    renderAuthNav();
  }

  // SHA-256 digest so passwords aren't kept as plain text in localStorage
  async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function renderAuthNav() {
    const session = getSession();
    if (session) {
      authNavItem.innerHTML =
        `<span class="nav-user">Hi, ${session.name.split(" ")[0]} ` +
        `<a href="#" class="logout-link" id="logoutLink">Log Out</a></span>`;
      document.getElementById("logoutLink").addEventListener("click", (e) => {
        e.preventDefault();
        setSession(null);
      });
    } else {
      authNavItem.innerHTML = `<a href="#" class="nav-link" id="loginNavLink">Login</a>`;
      document.getElementById("loginNavLink").addEventListener("click", (e) => {
        e.preventDefault();
        openAuthModal("login");
      });
    }
  }

  function clearAuthErrors() {
    document.querySelectorAll("#authModal .error-message").forEach((el) => (el.textContent = ""));
    document.querySelectorAll("#authModal .form-group").forEach((el) => el.classList.remove("invalid"));
    ["loginFeedback", "signupFeedback"].forEach((id) => {
      const el = document.getElementById(id);
      el.textContent = "";
      el.className = "form-feedback";
    });
  }

  function switchTab(tab) {
    const isLogin = tab === "login";
    tabLogin.classList.toggle("active", isLogin);
    tabSignup.classList.toggle("active", !isLogin);
    loginForm.classList.toggle("hidden", !isLogin);
    signupForm.classList.toggle("hidden", isLogin);
    authModalTitle.textContent = isLogin ? "Welcome Back" : "Create Your Account";
    clearAuthErrors();
  }

  function openAuthModal(tab) {
    authOverlay.classList.add("open");
    switchTab(tab || "login");
  }

  function closeAuthModal() {
    authOverlay.classList.remove("open");
    loginForm.reset();
    signupForm.reset();
    clearAuthErrors();
  }

  if (authOverlay) {
    tabLogin.addEventListener("click", () => switchTab("login"));
    tabSignup.addEventListener("click", () => switchTab("signup"));
    authClose.addEventListener("click", closeAuthModal);
    authOverlay.addEventListener("click", (e) => {
      if (e.target === authOverlay) closeAuthModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && authOverlay.classList.contains("open")) closeAuthModal();
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const nameInput = document.getElementById("signupName");
      const emailInput = document.getElementById("signupEmail");
      const passwordInput = document.getElementById("signupPassword");
      const confirmInput = document.getElementById("signupConfirm");
      const feedback = document.getElementById("signupFeedback");

      let isValid = true;
      const emailValue = emailInput.value.trim();

      if (nameInput.value.trim().length < 2) {
        setFieldError(nameInput, document.getElementById("signupNameError"), "Please enter your full name.");
        isValid = false;
      } else {
        setFieldError(nameInput, document.getElementById("signupNameError"), "");
      }

      if (!emailPattern.test(emailValue)) {
        setFieldError(emailInput, document.getElementById("signupEmailError"), "Please enter a valid email.");
        isValid = false;
      } else if (getUsers().some((u) => u.email.toLowerCase() === emailValue.toLowerCase())) {
        setFieldError(emailInput, document.getElementById("signupEmailError"), "An account with this email already exists.");
        isValid = false;
      } else {
        setFieldError(emailInput, document.getElementById("signupEmailError"), "");
      }

      if (passwordInput.value.length < 6) {
        setFieldError(passwordInput, document.getElementById("signupPasswordError"), "Password must be at least 6 characters.");
        isValid = false;
      } else {
        setFieldError(passwordInput, document.getElementById("signupPasswordError"), "");
      }

      if (!confirmInput.value || confirmInput.value !== passwordInput.value) {
        setFieldError(confirmInput, document.getElementById("signupConfirmError"), "Passwords do not match.");
        isValid = false;
      } else {
        setFieldError(confirmInput, document.getElementById("signupConfirmError"), "");
      }

      if (!isValid) {
        feedback.textContent = "Please fix the highlighted fields and try again.";
        feedback.classList.add("error");
        return;
      }

      const newUser = {
        name: nameInput.value.trim(),
        email: emailValue,
        passwordHash: await hashPassword(passwordInput.value),
      };
      const users = getUsers();
      users.push(newUser);
      saveUsers(users);
      setSession(newUser);

      feedback.textContent = `Welcome, ${newUser.name}! Your account has been created.`;
      feedback.classList.add("success");
      setTimeout(closeAuthModal, 900);
    });

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const emailInput = document.getElementById("loginEmail");
      const passwordInput = document.getElementById("loginPassword");
      const feedback = document.getElementById("loginFeedback");

      let isValid = true;
      const emailValue = emailInput.value.trim();

      if (!emailPattern.test(emailValue)) {
        setFieldError(emailInput, document.getElementById("loginEmailError"), "Please enter a valid email.");
        isValid = false;
      } else {
        setFieldError(emailInput, document.getElementById("loginEmailError"), "");
      }

      if (!passwordInput.value) {
        setFieldError(passwordInput, document.getElementById("loginPasswordError"), "Please enter your password.");
        isValid = false;
      } else {
        setFieldError(passwordInput, document.getElementById("loginPasswordError"), "");
      }

      if (!isValid) {
        feedback.textContent = "Please fix the highlighted fields and try again.";
        feedback.classList.add("error");
        return;
      }

      const passwordHash = await hashPassword(passwordInput.value);
      const matchedUser = getUsers().find(
        (u) => u.email.toLowerCase() === emailValue.toLowerCase() && u.passwordHash === passwordHash
      );

      if (!matchedUser) {
        feedback.textContent = "Incorrect email or password.";
        feedback.classList.add("error");
        return;
      }

      setSession(matchedUser);
      feedback.textContent = `Welcome back, ${matchedUser.name}!`;
      feedback.classList.add("success");
      setTimeout(closeAuthModal, 900);
    });

    renderAuthNav();
  }
});
