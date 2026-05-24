# scripts/dump_segmented_tabs.py

import os
import subprocess
from pathlib import Path
from datetime import datetime

# =========================================================
# CONFIG
# =========================================================

OUTPUT_FILE = Path(
    "/Users/mnsink/projects/ai-decision-system/frontend/debug/dump-context.txt"
)

PROJECT_ROOT = Path(
    "/Users/mnsink/projects/ai-decision-system/frontend"
)

KNOWN_CALLSITES = [
    "src/app/overview/_sections/OverviewChallenges.tsx",
    "src/app/architecture/_sections/ArchitecturePressure.tsx",
    "src/app/architecture/_sections/ArchitectureLayers.tsx",
]

COMPONENT_FILES = [
    {
        "path": "src/components/SegmentedTabs/SegmentedTabs.tsx",
        "title": "SegmentedTabs.tsx",
        "lang": "tsx",
    },
    {
        "path": "src/components/SegmentedTabs/segmentedTabs.behavior.ts",
        "title": "segmentedTabs.behavior.ts",
        "lang": "ts",
    },
    {
        "path": "src/components/SegmentedTabs/segmentedTabs.motion.ts",
        "title": "segmentedTabs.motion.ts",
        "lang": "ts",
    },
    {
        "path": "src/components/SegmentedTabs/segmentedTabs.tokens.ts",
        "title": "segmentedTabs.tokens.ts",
        "lang": "ts",
    },
    {
        "path": "src/components/SegmentedTabs/segmentedTabs.variants.ts",
        "title": "segmentedTabs.variants.ts",
        "lang": "ts",
    },
    {
        "path": "src/components/SegmentedTabs/index.ts",
        "title": "index.ts",
        "lang": "ts",
    },
]

# =========================================================
# PREP
# =========================================================

OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

# 每次执行先清空
OUTPUT_FILE.write_text("", encoding="utf-8")

md = []

# =========================================================
# HELPERS
# =========================================================

def now():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def get_file_time(path: Path):
    if not path.exists():
        return "MISSING"

    ts = path.stat().st_mtime
    return datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M:%S")


def append(text=""):
    md.append(text)


def append_file(file_path_str, title, lang="tsx"):
    file_path = PROJECT_ROOT / file_path_str

    append(f"## {title}\n")

    if not file_path.exists():
        append(f"MISSING: `{file_path}`\n")
        return

    content = file_path.read_text(encoding="utf-8")

    append(f"Path: `{file_path}`")
    append(f"Last Modified: `{get_file_time(file_path)}`\n")

    append(f"```{lang}")
    append(content)
    append("```\n")


def run_rg(command):
    try:
        result = subprocess.check_output(
            command,
            shell=True,
            cwd=PROJECT_ROOT,
            text=True,
        )
        return result
    except subprocess.CalledProcessError:
        return ""


# =========================================================
# HEADER
# =========================================================

append("# Segmented Tabs Runtime Dump\n")
append(f"Generated At: `{now()}`\n")

# =========================================================
# FILE DIRECTORY
# =========================================================

append("# File Directory\n")

all_files = []

for item in COMPONENT_FILES:
    all_files.append(item["path"])

for item in KNOWN_CALLSITES:
    all_files.append(item)

for f in all_files:
    full = PROJECT_ROOT / f

    append(f"- `{full}`")
    append(f"  - Last Modified: `{get_file_time(full)}`")

append("\n---\n")

# =========================================================
# CALLSITE AUDIT
# =========================================================

append("# Callsites Audit\n")

for f in KNOWN_CALLSITES:
    append(f"- `{f}`")

append("\n---\n")

# =========================================================
# STICKY AUDIT
# =========================================================

sticky_audit = run_rg(r'rg "sticky top-" src || true')

append("## sticky top-* usage\n")

append("```txt")
append(sticky_audit)
append("```\n")

# =========================================================
# Z INDEX AUDIT
# =========================================================

z_audit = run_rg(r'rg "z-[0-9]" src/app src/components || true')

append("## z-index usage\n")

append("```txt")
append(z_audit)
append("```\n")

# =========================================================
# COMPONENT FILES
# =========================================================

append("# SegmentedTabs Component Files\n")

for file in COMPONENT_FILES:
    append_file(
        file["path"],
        file["title"],
        file["lang"],
    )

# =========================================================
# PAGE CALLSITES
# =========================================================

append("# Page Callsites\n")

for p in KNOWN_CALLSITES:
    append_file(
        p,
        Path(p).name,
        "tsx",
    )

# =========================================================
# WRITE FILE
# =========================================================

OUTPUT_FILE.write_text("\n".join(md), encoding="utf-8")

print("\n✅ Dump generated:")
print(OUTPUT_FILE)

# =========================================================
# OPEN FINDER DIRECTORY
# =========================================================

subprocess.run(
    ["open", str(OUTPUT_FILE.parent)]
)