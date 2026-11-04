#!/usr/bin/env python3
"""
sync_medium.py — Import Medium articles into Jekyll _posts/

Alternative to the jekyll-import gem. Fetches the Medium RSS feed
and creates Jekyll-compatible markdown posts.

Usage:
    python3 scripts/sync_medium.py [--username USERNAME] [--output _posts]

By default imports from @bitr13x.
"""

import argparse
import os
import re
import sys
import hashlib
from datetime import datetime
from urllib.request import urlopen
from xml.etree import ElementTree as ET

MEDIUM_FEED = "https://medium.com/feed/@{username}"
NS = {
    "atom": "http://www.w3.org/2005/Atom",
    "content": "http://purl.org/rss/1.0/modules/content/",
    "dc": "http://purl.org/dc/elements/1.1/",
    "media": "http://search.yahoo.com/mrss/",
}


def slugify(title):
    """Convert a title to a URL-safe slug."""
    slug = re.sub(r"[^\w\s-]", "", title.lower())
    slug = re.sub(r"[-\s]+", "-", slug).strip("-")
    return slug[:80]  # cap length


def parse_item(item):
    """Parse a single RSS <item> into a post dict."""
    def find(tag, ns=None):
        el = item.find(tag, ns) if ns else item.find(tag)
        return el.text if el is not None and el.text else ""

    title = find("title")
    link = find("link")
    pub_date = find("pubDate")
    content = find("{http://purl.org/rss/1.0/modules/content/}encoded")

    # Parse date
    try:
        dt = datetime.strptime(pub_date, "%a, %d %b %Y %H:%M:%S %Z")
    except (ValueError, TypeError):
        try:
            dt = datetime.strptime(pub_date, "%a, %d %b %Y %H:%M:%S %Z")
        except (ValueError, TypeError):
            dt = datetime.now()

    # Extract tags
    tags = []
    for cat in item.findall("category"):
        if cat.text and cat.text.lower() not in ("uncategorized",):
            tags.append(cat.text.strip().lower().replace(" ", "-"))

    # Generate a stable hash-based filename to avoid duplicates
    url_hash = hashlib.md5(link.encode()).hexdigest()[:8]
    slug = slugify(title)
    filename = f"{dt.strftime('%Y-%m-%d')}-{slug}-{url_hash}.md"

    return {
        "title": title,
        "date": dt.strftime("%Y-%m-%d %H:%M:%S"),
        "link": link,
        "content": content or "",
        "tags": tags[:5],
        "filename": filename,
    }


def generate_front_matter(post):
    """Generate Jekyll front matter for a post."""
    tags_yaml = "\n".join(f"  - {t}" for t in post["tags"])
    tags_block = f"tags:\n{tags_yaml}" if post["tags"] else "tags: []"

    excerpt = re.sub(r"<[^>]+>", "", post["content"])[:160].strip()
    excerpt = excerpt.replace('"', "'").replace("\n", " ")

    return f"""---
layout: post
title: "{post['title']}"
date: {post['date']}
{tags_block}
excerpt: "{excerpt}..."
original_url: "{post['link']}"
---

<!-- Originally published on Medium: {post['link']} -->

{post['content']}
"""


def post_exists(output_dir, filename):
    """Check if a post with this filename already exists."""
    return os.path.exists(os.path.join(output_dir, filename))


def main():
    parser = argparse.ArgumentParser(description="Import Medium articles to Jekyll _posts/")
    parser.add_argument("--username", default="bitr13x", help="Medium username (default: bitr13x)")
    parser.add_argument("--output", default="_posts", help="Output directory (default: _posts)")
    args = parser.parse_args()

    feed_url = MEDIUM_FEED.format(username=args.username)
    print(f"Fetching: {feed_url}")

    try:
        with urlopen(feed_url) as resp:
            tree = ET.parse(resp)
    except Exception as e:
        print(f"Error fetching feed: {e}", file=sys.stderr)
        sys.exit(1)

    items = tree.findall(".//item")
    if not items:
        print("No articles found in feed.")
        sys.exit(0)

    os.makedirs(args.output, exist_ok=True)
    imported = 0
    skipped = 0

    for item in items:
        post = parse_item(item)
        if post_exists(args.output, post["filename"]):
            skipped += 1
            continue

        filepath = os.path.join(args.output, post["filename"])
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(generate_front_matter(post))
        print(f"  Imported: {post['title'][:70]}")
        imported += 1

    print(f"\nDone: {imported} imported, {skipped} skipped (already exist)")


if __name__ == "__main__":
    main()
