from pathlib import Path

from utils.text_transform import (
    regex_replace,
    sanitize_whitespace,
)

# =========================================================
# TARGET FILE
# =========================================================

file_path = Path(
    "/Users/mnsink/projects/ai-decision-system/frontend/src/components/SegmentedTabs/segmentedTabs.variants.ts"
)

# =========================================================
# READ
# =========================================================

content = file_path.read_text(encoding="utf-8")

content = sanitize_whitespace(content)

# =========================================================
# PATCH
# =========================================================

pattern = (
    r'bg-\[#030712\]/18\s+'
    r'backdrop-blur-md\s+'
    r'supports-\[backdrop-filter\]:bg-\[#030712\]/12'
)

replacement = (
    'bg-[#030712]/55 '
    'backdrop-blur-xl '
    'supports-[backdrop-filter]:bg-[#030712]/45 '
    'border-b border-white/[0.04]'
)

content = regex_replace(
    content=content,
    pattern=pattern,
    replacement=replacement,
)

# =========================================================
# WRITE
# =========================================================

file_path.write_text(
    content,
    encoding="utf-8",
)

print("\nPatch applied successfully.")
print(f"\nUpdated file:\n{file_path}")