#!/usr/bin/env python3
"""Crawl every generated .html file and confirm every internal href/src
resolves to a real file, resolving relative paths exactly as a browser
would from each file's own location (this site uses relative links
throughout so it works at any subpath — see README "Deployment").
No dependencies beyond the standard library.

Usage: python3 scripts/check-links.py
"""
import os
import re
import sys
import posixpath

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", ".github", "scripts", "generator"}


def html_files():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for f in filenames:
            if f.endswith(".html"):
                yield os.path.join(dirpath, f)


def is_internal(link):
    return not re.match(r"^([a-z][a-z0-9+.-]*:|#)", link, re.IGNORECASE)


def resolve(html_file, link):
    link = link.split("#")[0].split("?")[0]
    if link == "":
        return html_file
    file_dir = "/" + os.path.relpath(os.path.dirname(html_file), ROOT).replace(os.sep, "/")
    if file_dir == "/.":
        file_dir = "/"
    combined = posixpath.normpath(posixpath.join(file_dir, link))
    if combined.endswith("/") or link.endswith("/"):
        combined = posixpath.join(combined, "index.html")
    return os.path.join(ROOT, combined.lstrip("/"))


def main():
    files = list(html_files())
    checks = []  # (html_file, link, resolved_path)
    for f in files:
        with open(f, encoding="utf-8") as fh:
            content = fh.read()
        for attr in ("href", "src"):
            for m in re.findall(rf'{attr}="([^"]*)"', content):
                if is_internal(m):
                    checks.append((f, m, resolve(f, m)))

    broken = [(f, link) for f, link, resolved in checks if not os.path.isfile(resolved)]

    print(f"Checked {len(files)} HTML files, {len(checks)} internal link references.")
    if broken:
        print("Broken internal links:")
        for f, link in broken:
            print(f"  {os.path.relpath(f, ROOT)}  ->  {link}")
        sys.exit(1)
    print("All internal links resolve.")


if __name__ == "__main__":
    main()
