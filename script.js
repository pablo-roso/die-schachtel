// Die Schachtel — Website-Entwurf
// Reines Vanilla-JS, keine Abhängigkeiten. Rein clientseitig, kein Backend.

(function () {
  "use strict";

  /* --- Aktuelles Jahr im Footer --- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --- Mobile Navigation --- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Navigation nach Klick auf einen Link schließen (mobil)
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --- Kontaktformular: rein clientseitig, nicht funktional --- */
  var form = document.getElementById("contact-form");
  var feedback = document.getElementById("form-feedback");

  if (form && feedback) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      feedback.hidden = false;
      feedback.textContent =
        "Danke! Dies ist nur ein Entwurf — das Formular ist noch nicht aktiv und verschickt aktuell keine Nachrichten.";
      form.reset();
    });
  }
})();
