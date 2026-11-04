/* ============================================================
   reveal.js — scroll-triggered fade-in animations
   ============================================================ */
(function () {
  "use strict";

  var els = document.querySelectorAll(".reveal");

  if (!els.length) return;

  // Fallback: if IntersectionObserver is unavailable, show everything
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Stagger slightly using index-based delay
        var idx = Array.prototype.indexOf.call(entry.target.parentNode.children, entry.target);
        entry.target.style.transitionDelay = (Math.min(idx, 6) * 60) + "ms";
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  els.forEach(function (el) { observer.observe(el); });
})();
