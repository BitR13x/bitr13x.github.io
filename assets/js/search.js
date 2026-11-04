/* ============================================================
   search.js — client-side title search + tag filter for blog
   Works with Jekyll-rendered article cards that have data attributes.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  var searchInput = document.getElementById("search-input");
  var grid = document.getElementById("articles-grid");
  var resultCount = document.getElementById("result-count");
  var tagFilter = document.getElementById("tag-filter");
  var noResults = document.getElementById("no-results");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".article-card"));
  var activeTag = null;

  // ---- build tag filter ----
  var tagMap = {};
  cards.forEach(function (card) {
    var tags = (card.dataset.tags || "").split(",").filter(Boolean);
    tags.forEach(function (t) { tagMap[t] = (tagMap[t] || 0) + 1; });
  });
  var allTags = Object.keys(tagMap).sort();

  function renderTagFilter() {
    if (!tagFilter) return;
    var html = '<span class="tag ' + (activeTag === null ? "active" : "") + '" data-tag="">all</span>';
    allTags.forEach(function (t) {
      html += '<span class="tag ' + (activeTag === t ? "active" : "") + '" data-tag="' + t + '">' + t + " (" + tagMap[t] + ")</span>";
    });
    tagFilter.innerHTML = html;
    tagFilter.querySelectorAll(".tag").forEach(function (el) {
      el.addEventListener("click", function () {
        activeTag = el.dataset.tag || null;
        renderTagFilter();
        applyFilter();
      });
    });
  }

  function applyFilter() {
    var q = searchInput ? searchInput.value.trim().toLowerCase() : "";
    var visible = 0;

    cards.forEach(function (card) {
      var title = card.dataset.title || "";
      var tags = card.dataset.tags || "";
      var matchTitle = !q || title.indexOf(q) !== -1;
      var matchTag = !activeTag || tags.indexOf(activeTag) !== -1;
      var show = matchTitle && matchTag;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });

    if (resultCount) {
      resultCount.innerHTML = '<span class="num">' + visible + "</span> / " + cards.length + " articles" +
        (q ? ' matching "' + q + '"' : "") + (activeTag ? " [" + activeTag + "]" : "");
    }
    if (noResults) noResults.style.display = visible === 0 ? "block" : "none";
  }

  if (searchInput) searchInput.addEventListener("input", applyFilter);
  renderTagFilter();
  applyFilter();
});
