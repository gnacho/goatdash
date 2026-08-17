#!/bin/sh
# Goatdash weekly updater: downloads the latest stable GitHub release,
# verifies its checksum, backs up the current public folder and swaps it.
# Intended to run from a systemd timer on webs2 as root.

set -e

REPO="gnacho/goatdash"
INSTALL_DIR="/opt/goatcounter-dashboard/public"
BACKUP_DIR="/opt/goatcounter-dashboard/backups"
LOG_FILE="/var/log/goatdash-update.log"

timestamp() { date -Iseconds; }
log() { echo "[$(timestamp)] $*" >> "$LOG_FILE"; }
error() { log "ERROR: $*"; exit 1; }

# Ensure directories exist
mkdir -p "$BACKUP_DIR"
TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

log "Starting goatdash update check"

# --- Fetch latest stable release metadata
RELEASE_JSON="$TMPDIR/release.json"
if ! curl -fsSL --retry 3 --retry-delay 2 "https://api.github.com/repos/$REPO/releases/latest" -o "$RELEASE_JSON"; then
  error "Failed to fetch latest release metadata from GitHub"
fi

TAG=$(sed -n 's/.*"tag_name": *"\([^"]*\)".*/\1/p' "$RELEASE_JSON" | head -n1)
[ -n "$TAG" ] || error "Could not parse release tag"
VERSION=${TAG#v}
ASSET="goatdash-${VERSION}.tar.gz"

log "Latest release is $TAG (asset $ASSET)"

# --- Download asset and checksums
ASSET_URL="https://github.com/$REPO/releases/download/$TAG/$ASSET"
CHECKSUMS_URL="https://github.com/$REPO/releases/download/$TAG/checksums.txt"

if ! curl -fsSL --retry 3 --retry-delay 2 "$ASSET_URL" -o "$TMPDIR/$ASSET"; then
  error "Failed to download $ASSET"
fi
if ! curl -fsSL --retry 3 --retry-delay 2 "$CHECKSUMS_URL" -o "$TMPDIR/checksums.txt"; then
  error "Failed to download checksums.txt"
fi

# --- Verify checksum
cd "$TMPDIR"
if ! grep -q "$ASSET" checksums.txt; then
  error "$ASSET not listed in checksums.txt"
fi
grep "$ASSET" checksums.txt | sha256sum -c - || error "Checksum verification failed for $ASSET"

# --- Backup current installation
TS=$(date +%Y%m%d-%H%M%S)
BACKUP_TGZ="$BACKUP_DIR/public-$TS.tar.gz"
if [ -d "$INSTALL_DIR" ]; then
  tar -czf "$BACKUP_TGZ" -C "$INSTALL_DIR" . || error "Failed to backup $INSTALL_DIR"
  log "Backup created: $BACKUP_TGZ"
else
  log "Install dir $INSTALL_DIR does not exist yet; skipping backup"
fi

# --- Extract release
EXTRACT_DIR="$TMPDIR/extract"
mkdir -p "$EXTRACT_DIR"
tar -xzf "$TMPDIR/$ASSET" -C "$EXTRACT_DIR"
SRC="$EXTRACT_DIR/goatdash"
[ -d "$SRC" ] || error "Extracted directory $SRC not found"

# --- Atomically swap files (rsync into live dir)
mkdir -p "$INSTALL_DIR"
if ! rsync -a --delete "$SRC/" "$INSTALL_DIR/"; then
  error "Failed to rsync release into $INSTALL_DIR"
fi

# --- Permissions: web readable
chown -R root:root "$INSTALL_DIR"
chmod -R u=rwX,go=rX "$INSTALL_DIR"

log "Updated $INSTALL_DIR to $TAG"
