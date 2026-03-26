#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-ours}"

if [[ "${MODE}" != "ours" && "${MODE}" != "theirs" ]]; then
  echo "Usage: bash scripts/override_conflicts.sh [ours|theirs]"
  exit 1
fi

UNMERGED_FILES="$(git diff --name-only --diff-filter=U)"
if [[ -z "${UNMERGED_FILES}" ]]; then
  echo "No unmerged files found."
  exit 0
fi

echo "Overriding conflicts with: ${MODE}"
printf '%s\n' "${UNMERGED_FILES}"

git checkout --"${MODE}" .
git add -A
git commit -m "Resolve conflicts using --${MODE} override"

echo "Done. Conflicts resolved with --${MODE}."
