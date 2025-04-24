---
layout: default
title: "Greetings, traveller!"
---

<style>
  body {
    margin-top: 10vh;
    margin-left: 5vw;
    margin-right: 5vw;
    color: #f0f0f0;
  }

  nav {
    max-width: 960px;
    margin: 2rem auto;
    padding: 1rem 0;
    mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #171a1d 20%, #171a1d 80%, rgba(0, 0, 0, 0) 100%); /* Darker blend */
    -webkit-mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #171a1d 20%, #171a1d 80%, rgba(0, 0, 0, 0) 100%); /* For Safari */
  }

  nav ul {
    text-align: center;
    background: linear-gradient(90deg, rgba(51, 51, 51, 0) 0%, rgba(51, 51, 51, 0.1) 20%, rgba(51, 51, 51, 0.1) 80%, rgba(51, 51, 51, 0) 100%); /* Subtle dark overlay */
    background-color: #171a1d;
    list-style-type: none;
    margin: 0;
    padding: 0;
    justify-content: center;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2), inset 0 0 1px rgba(255, 255, 255, 0.1); /* Refined shadow */
  }

  nav li {
    display: inline;
  }

  nav a {
    display: block;
    color: #f0f0f0;
    padding: 0.75rem 1rem;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }

  nav a:hover {
    background-color: #272c31;
    color: #fff;
  }

  /* Responsive adjustments */
  @media (max-width: 500px) {
    nav {
      mask-image: none;
      -webkit-mask-image: none;
      padding: 0;
      margin: 1rem auto;
      border-bottom: 1px solid #444;
    }

    nav ul {
      flex-direction: column;
      align-items: stretch;
      background: #171a1d;
      box-shadow: none;
    }

    nav li {
      display: block;
    }

    nav a {
      padding: 0.75rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid #444;
    }

    nav li:last-child a {
      border-bottom: none;
    }
  }
</style>

<div class="main">
  <div class="wrapper">
    <h1 class="text scale-up">@BitR13x</h1>
    <div class="subtext fade-in">
      I'm programmer and penetration tester who is passionate about code. <br>
      I'm always looking to learn new technologies.<br><br>
      This site is just my storage of learning content and quick introduction.
    </div>
    <nav>
      <ul>
        <li>
          <a href="#">/Home</a>
        </li>
        <li>
          <a href="{% link notes.md %}">/Notes</a>
        </li>
        <li>
          <a href="{% link sources.md %}">/Hacking Sources</a>
        </li>
        <li>
          <a href="{% link blog.md %}">/Articles</a>
        </li>
      </ul>
    </nav>
    <div class="icons">
      <div class="--li">
        <a target="_blank" href="https://github.com/BitR13x" class="icon">
          <svg viewBox="0 0 40 40">
            <use xlink:href="{{"/assets/icons/github.svg#icon" | relative_url }}"></use>
          </svg><!-- <span class="--label">github</span> -->
        </a>
      </div>
      <div class="--li">
        <a target="_blank" href="mailto:sw33tbit@protonmail.com" class="icon">
          <svg viewBox="0 0 40 40">
            <use xlink:href="{{"/assets/icons/email.svg#icon" | relative_url }}"></use>
          </svg><!-- <span class="--label">email</span> -->
        </a>
      </div>
      <div class="--li">
        <a target="_blank" href="https://medium.com/@bitr13x" class="icon">
          <svg viewBox="0 0 40 40">
            <use xlink:href="{{"/assets/icons/medium.svg#icon" | relative_url }}"></use>
          </svg><!-- <span class="--label">medium</span> -->
        </a>
      </div>
      <div class="--li">
        <a target="_blank" href="https://www.buymeacoffee.com/bitr13x" class="icon">
          <svg viewBox="0 0 40 40">
            <use xlink:href="{{"/assets/icons/buymecoffee.svg#icon" | relative_url }}"></use>
          </svg><!-- <span class="--label">buymeacoffee</span> -->
        </a>
      </div>
    </div>
  </div>
</div>


<div class="badge-wrapper">
  <div class="thm">
    <script src="https://tryhackme.com/badge/31780"></script>
  </div>

  <div class="htb">
    <script src="https://www.hackthebox.eu/badge/278324"></script>
  </div>
</div>

<canvas id="canvas"></canvas>

<script type="text/javascript" src="{{"/assets/scripts/canvas.js" | relative_url }}" charset="utf-8"></script>