#!/bin/bash

# ============================================================
# CodeAcademy Teaching Resources - Folder Structure Fixer
# ============================================================
# This script ensures every batch folder has the required
# subfolders and adds .gitkeep files to empty directories
# so Git tracks them.
# ============================================================

# --- Configuration ---
BATCH_FOLDERS=("FS_B5" "WD_B6" "WD_B7" "WD_B8" "WD_B9" "FS_B10")
REQUIRED_SUBFOLDERS=("backend_classes" "database_classes" "frontend_classes" "git_github_classes" "UIUX_frameworks_classes")
TYPO_NAME="UIUX_framworks_classes"
CORRECT_NAME="UIUX_frameworks_classes"

echo "========================================================"
echo "  CodeAcademy Folder Structure Fixer"
echo "========================================================"
echo ""

# --- Step 1: Fix typo in existing folders ---
echo "[Step 1] Fixing typo: '$TYPO_NAME' -> '$CORRECT_NAME'"
echo "--------------------------------------------------------"
for batch in "${BATCH_FOLDERS[@]}"; do
    if [ -d "$batch/$TYPO_NAME" ]; then
        # Use git mv if the folder is tracked, otherwise regular mv
        if git ls-files --error-unmatch "$batch/$TYPO_NAME" &>/dev/null 2>&1; then
            git mv "$batch/$TYPO_NAME" "$batch/$CORRECT_NAME"
            echo "  ✔ git mv: $batch/$TYPO_NAME -> $batch/$CORRECT_NAME"
        else
            mv "$batch/$TYPO_NAME" "$batch/$CORRECT_NAME"
            echo "  ✔ mv: $batch/$TYPO_NAME -> $batch/$CORRECT_NAME"
        fi
    fi
done
echo ""

# --- Step 2: Create missing batch folders and subfolders ---
echo "[Step 2] Creating missing folders"
echo "--------------------------------------------------------"
for batch in "${BATCH_FOLDERS[@]}"; do
    # Create the batch folder if it doesn't exist
    if [ ! -d "$batch" ]; then
        mkdir -p "$batch"
        echo "  ✔ Created batch folder: $batch"
    else
        echo "  – Batch folder exists:  $batch"
    fi

    # Create each required subfolder
    for subfolder in "${REQUIRED_SUBFOLDERS[@]}"; do
        target="$batch/$subfolder"
        if [ ! -d "$target" ]; then
            mkdir -p "$target"
            echo "    ✔ Created: $target"
        else
            echo "    – Exists:  $target"
        fi
    done
done
echo ""

# --- Step 3: Add .gitkeep to empty subfolders ---
echo "[Step 3] Adding .gitkeep to empty subfolders"
echo "--------------------------------------------------------"
for batch in "${BATCH_FOLDERS[@]}"; do
    for subfolder in "${REQUIRED_SUBFOLDERS[@]}"; do
        target="$batch/$subfolder"
        gitkeep="$target/.gitkeep"

        # Count items (excluding .gitkeep itself)
        item_count=$(find "$target" -mindepth 1 ! -name ".gitkeep" | head -1)

        if [ -z "$item_count" ]; then
            # Folder is empty (or only has .gitkeep) — ensure .gitkeep exists
            if [ ! -f "$gitkeep" ]; then
                touch "$gitkeep"
                echo "  ✔ Added .gitkeep: $gitkeep"
            else
                echo "  – .gitkeep exists: $gitkeep"
            fi
        else
            echo "  – Has content:    $target (skipping .gitkeep)"
        fi
    done
done
echo ""

# --- Step 4: Summary ---
echo "========================================================"
echo "  ✅ Structure fix complete!"
echo "========================================================"
echo ""
echo "Now run these Git commands to commit and push:"
echo ""
echo "  git add -A"
echo "  git commit -m \"fix: standardize batch folder structure with required subfolders\""
echo "  git push origin main"
echo ""
