#!/usr/bin/env python3
"""
Ingest an arXiv paper into Epiphysics research sources.

Pipeline:
1) Download PDF from arXiv id
2) Extract plain text with pdftotext
3) Generate research markdown file with required frontmatter + full extracted text

Usage:
  python3 scripts/research/ingest_arxiv_paper.py 1910.12478 \
    --slug tensor_programs_i_1910_12478 \
    --title "Tensor Programs I (arXiv:1910.12478) — Full Text Extraction"
"""

from __future__ import annotations

import argparse
import re
import subprocess
from datetime import date
from pathlib import Path
from urllib.request import urlretrieve


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def sanitize_slug(s: str) -> str:
    s = s.strip().lower().replace(" ", "_")
    return re.sub(r"[^a-z0-9_\-]", "", s)


def build_frontmatter(title: str, description: str, alt_text: str, today_iso: str, source_pdf_rel: str, source_txt_rel: str, arxiv_id: str) -> str:
    return f'''---
title: "{title}"
description: >-
  {description}
date: {today_iso}T00:00:00.000Z
draft: true
author:
  name: "epiphysics-open-source"
contentType: article
series: "Research Sources"
coverImage:
  url: ./images/{arxiv_id}.png
  alt: "{alt_text}"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

> [!note]
> Source PDF: `{source_pdf_rel}`
>
> Extracted text: `{source_txt_rel}`
>
> DOI: https://doi.org/10.48550/arXiv.{arxiv_id}

## Full extracted text

```text
'''


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("arxiv_id", help="e.g. 1910.12478")
    p.add_argument("--slug", help="output slug (defaults to arxiv_<id>)")
    p.add_argument("--title", help="document title")
    p.add_argument("--description", default="Raw full-text extraction for computational analysis and citation mining.")
    p.add_argument("--alt", default="Mathematical paper text extraction for representational mechanics research")
    p.add_argument("--root", default=".", help="repo root")
    args = p.parse_args()

    root = Path(args.root).resolve()
    arxiv_id = args.arxiv_id.strip()
    slug = sanitize_slug(args.slug or f"arxiv_{arxiv_id.replace('.', '_')}")
    title = args.title or f"arXiv:{arxiv_id} — Full Text Extraction"

    sources_dir = root / "docs" / "research" / "sources"
    sources_dir.mkdir(parents=True, exist_ok=True)

    pdf_path = sources_dir / f"{arxiv_id}.pdf"
    txt_path = sources_dir / f"{arxiv_id}.txt"
    md_path = root / "docs" / "research" / f"{slug}_full_extraction.md"

    pdf_url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"
    print(f"Downloading: {pdf_url}")
    urlretrieve(pdf_url, pdf_path)

    print("Extracting text with pdftotext...")
    run(["pdftotext", str(pdf_path), str(txt_path)])

    text = txt_path.read_text(errors="ignore")

    source_pdf_rel = str(pdf_path.relative_to(root))
    source_txt_rel = str(txt_path.relative_to(root))
    today_iso = date.today().isoformat()

    fm = build_frontmatter(
        title=title,
        description=args.description,
        alt_text=args.alt,
        today_iso=today_iso,
        source_pdf_rel=source_pdf_rel,
        source_txt_rel=source_txt_rel,
        arxiv_id=arxiv_id,
    )

    md_path.write_text(fm + text + "\n```\n")

    print(f"Wrote: {pdf_path}")
    print(f"Wrote: {txt_path}")
    print(f"Wrote: {md_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
