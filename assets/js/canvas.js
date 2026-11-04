/* ============================================================
   canvas.js — particle network background
   Adapted from bitr13x original (dudleystorey codepen)
   ============================================================ */

(function () {
  "use strict";

  var canvas = document.getElementById("canvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var w, h, particles = [], tid;

  var opts = {
    particleColor: "rgba(255, 107, 53, 0.45)",
    lineColor: "255, 107, 53",
    particleAmount: 20,
    defaultSpeed: 0.35,
    variantSpeed: 0.45,
    defaultRadius: 1.5,
    variantRadius: 1.8,
    linkRadius: 220,
  };

  function resizeReset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function deBounce() {
    clearTimeout(tid);
    tid = setTimeout(resizeReset, 200);
  }

  function checkDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  function linkPoints(p1, hubs) {
    for (var i = 0; i < hubs.length; i++) {
      var dist = checkDistance(p1.x, p1.y, hubs[i].x, hubs[i].y);
      var opacity = 1 - dist / opts.linkRadius;
      if (opacity > 0) {
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = "rgba(" + opts.lineColor + ", " + (opacity * 0.15) + ")";
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(hubs[i].x, hubs[i].y);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
    this.angle = Math.floor(Math.random() * 360);
    this.radius = Math.max(0.5, opts.defaultRadius + Math.random() * opts.variantRadius);
    this.vector = {
      x: Math.cos(this.angle) * this.speed,
      y: Math.sin(this.angle) * this.speed,
    };
  }

  Particle.prototype.update = function () {
    if (this.x >= w || this.x <= 0) this.vector.x *= -1;
    if (this.y >= h || this.y <= 0) this.vector.y *= -1;
    this.x = Math.max(0, Math.min(w, this.x + this.vector.x));
    this.y = Math.max(0, Math.min(h, this.y + this.vector.y));
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = opts.particleColor;
    ctx.fill();
  };

  function setup() {
    particles = [];
    resizeReset();
    var count = Math.min(opts.particleAmount, Math.floor((w * h) / 45000));
    for (var i = 0; i < count; i++) particles.push(new Particle());
    requestAnimationFrame(loop);
  }

  function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); }
    for (var i = 0; i < particles.length; i++) linkPoints(particles[i], particles);
  }

  window.addEventListener("resize", deBounce);

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  setup();
})();
