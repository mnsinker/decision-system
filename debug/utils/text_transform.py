import re


def normalize(text: str) -> str:
    """
    Normalize formatting noise so matching becomes more stable.

    Handles:
    - multiple spaces
    - tabs
    - newlines
    - inconsistent indentation
    """

    return " ".join(text.split())


def regex_replace(
    content: str,
    pattern: str,
    replacement: str,
    flags: int = re.MULTILINE,
) -> str:
    """
    Regex-based replacement with failure protection.

    Raises:
        Exception: if pattern is not found.
    """

    new_content = re.sub(
        pattern,
        replacement,
        content,
        flags=flags,
    )

    if new_content == content:
        raise Exception(
            f"Pattern not found:\n{pattern}"
        )

    return new_content


def contains_normalized(
    content: str,
    target: str,
) -> bool:
    """
    Check whether target exists after normalization.
    Useful for debugging exact-match failures.
    """

    return normalize(target) in normalize(content)


def sanitize_whitespace(text: str) -> str:
    """
    Convert Windows/Mac line endings into standard LF.
    Remove trailing whitespace.
    """

    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")

    lines = [line.rstrip() for line in text.split("\n")]

    return "\n".join(lines)