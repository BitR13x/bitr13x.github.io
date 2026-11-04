/* ============================================================
   copy-code.js — adds a copy button to code blocks
   Handles both rouge .highlight wrappers and raw <pre> blocks.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  var blocks = document.querySelectorAll(".highlight pre, pre:not(.highlight)");

  blocks.forEach(function (block) {
    // avoid double-adding
    if (block.querySelector(".copy-code-button")) return;

    var btn = document.createElement("button");
    btn.className = "copy-code-button";
    btn.type = "button";
    btn.textContent = "copy";

    var wrapper = block.closest(".highlight") || block;
    wrapper.style.position = "relative";
    wrapper.appendChild(btn);

    btn.addEventListener("click", function () {
      var code = block.querySelector("code") || block;
      var text = code.textContent;

      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = "copied!";
        setTimeout(function () { btn.textContent = "copy"; }, 2000);
      }).catch(function () {
        btn.textContent = "error";
        setTimeout(function () { btn.textContent = "copy"; }, 2000);
      });
    });
  });
});
