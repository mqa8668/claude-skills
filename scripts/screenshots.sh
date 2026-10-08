#!/bin/bash
# Regenerates docs/media/sample-proposal.png and sample-vietnamese.png.
# Needs python3, pandoc, ffmpeg and Playwright for Python (pip install playwright; playwright install chromium).
set -e
cd "$(dirname "$0")/.."
B=plugins/tech-docs/skills/doc-builder/scripts/build_doc.py
T=$(mktemp -d)
# shellcheck disable=SC2016
python3 "$B" examples/sample.md --out "$T"/sample.html --eyebrow "Proposal" --subtitle "Queue clustering and database failover" --meta "Prepared for Acme Logistics | Sample document" --brand "Example Infra Co." --stat '$9,750 USD' --stat-label "Total investment" --stat-note "15 days over 5 weeks" --footer "Sample data - fictional customer"
python3 "$B" examples/sample-vi.md --out "$T"/sample-vi.html --eyebrow "Đề xuất kiến trúc" --subtitle "Job queue và database, dành cho Acme Logistics" --meta "Tài liệu mẫu, dữ liệu hư cấu" --brand "Example Infra Co." --stat "15 ngày công" --stat-label "Khối lượng ước tính" --stat-note "5 tuần" --footer "Dữ liệu mẫu - khách hàng hư cấu"
python3 - "$T" <<'PY'
import sys
from playwright.sync_api import sync_playwright
t = sys.argv[1]
with sync_playwright() as p:
    b = p.chromium.launch()
    for name, h in (("sample", 1100), ("sample-vi", 1160)):
        pg = b.new_page(viewport={"width": 794, "height": h}, device_scale_factor=2)
        pg.goto(f"file://{t}/{name}.html")
        pg.wait_for_timeout(1500)
        pg.screenshot(path=f"{t}/{name}.png", clip={"x": 0, "y": 30, "width": 794, "height": h - 30})
    b.close()
PY
mkdir -p docs/media
ffmpeg -loglevel error -y -i "$T"/sample.png -vf scale=1400:-1:flags=lanczos docs/media/sample-proposal.png
ffmpeg -loglevel error -y -i "$T"/sample-vi.png -vf scale=1400:-1:flags=lanczos docs/media/sample-vietnamese.png
