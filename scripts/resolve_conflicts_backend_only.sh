#!/usr/bin/env bash
set -euo pipefail

# Use when merge/rebase conflicts are too complex and you want to keep
# the backend-only FastAPI version from your current branch.

echo "[1/4] Checking for ongoing merge/rebase conflict..."
UNMERGED_FILES="$(git diff --name-only --diff-filter=U)"
if [[ -z "${UNMERGED_FILES}" ]]; then
  echo "No unmerged files found. Nothing to resolve."
  exit 0
fi

echo "Unmerged files:"
printf '%s\n' "${UNMERGED_FILES}"

echo "[2/4] Keeping CURRENT branch version for all conflicted files..."
git checkout --ours .

echo "[3/4] Staging resolved files..."
git add -A

echo "[4/4] Creating conflict-resolution commit..."
git commit -m "Resolve conflicts by keeping backend-only FastAPI implementation"

echo "Done. Conflicts resolved with current branch versions."
