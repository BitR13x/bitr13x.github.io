---
layout: sources
title: "Notes"
---
<style>
  .content {
    margin: 5vh 5vw;
    padding: 20px;
    background-color: #f0f0f0; /* Light background */
    color: #333; /* Dark text for contrast (initially) */
    border-radius: 15px;
    border: 1px solid #ddd; /* Subtle border */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow */
  }

  .content iframe {
    height: 80vh;
    width: 100%;
    border: none;
    background-color: #f0f0f0; /* White iframe background */
    color: #333; /* Default text color within iframe (if it listens now) */
    font-family: 'Courier New', monospace;
    font-weight: 400;
    padding: 1rem;
    box-sizing: border-box;
  }
</style>

<div class="content">
  <iframe src="{{"basic.txt" | relative_url}}" frameborder="0"></iframe>
</div>

<canvas id="canvas"></canvas>
<script type="text/javascript" src="./assets/scripts/canvas.js" charset="utf-8"></script>
