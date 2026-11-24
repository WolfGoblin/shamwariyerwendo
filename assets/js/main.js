/* Shamwari YeRwendo — site behaviour */
(function () {
  "use strict";

  /* ---- Settings: change these when your details are ready ---- */
  // Email address that receives form submissions (used to open the visitor's email app).
  var CONTACT_EMAIL = "info@shamwariyerwendo.org";
  // Optional: paste a form endpoint (e.g. from formspree.io) to receive submissions without email.
  var FORM_ENDPOINT = "";

  document.documentElement.classList.remove("no-js");

  /* ---- Year in footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky header shadow ---- */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---- Active nav link on scroll ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav ul a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Forms ---- */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.querySelectorAll(".js-form").forEach(function (form) {
    var msg = form.querySelector(".form-msg");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var valid = field.value.trim() !== "" && (field.type !== "email" || emailRe.test(field.value.trim()));
        field.classList.toggle("invalid", !valid);
        if (!valid && ok) { field.focus(); ok = false; }
      });
      if (!ok) { msg.textContent = "Please check the highlighted fields."; return; }

      var data = new FormData(form);
      data.append("form", form.dataset.kind);

      if (FORM_ENDPOINT) {
        msg.textContent = "Sending…";
        fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) { if (!r.ok) throw new Error(); done(); })
          .catch(function () { msg.textContent = "Sorry, something went wrong. Please call or WhatsApp us instead."; });
        return;
      }

      // No endpoint configured: open the visitor's email app with the details filled in.
      var subject = form.dataset.kind === "newsletter" ? "Join the wellness community" : "Request: " + (data.get("service") || "Enquiry");
      var lines = [];
      data.forEach(function (v, k) { if (k !== "form" && String(v).trim()) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ": " + v); });
      window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
      done();
    });

    form.addEventListener("input", function (e) { e.target.classList.remove("invalid"); });

    function done() {
      form.reset();
      msg.textContent = form.dataset.kind === "newsletter"
        ? "Thank you for joining! Welcome to the community."
        : "Thank you. We've received your request and will be in touch soon.";
    }
  });
})();
