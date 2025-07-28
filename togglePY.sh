#!/bin/bash
# This script toggles between the original quadJSONsmall.py and the refactored version.

# --- One-time migration for old .bak file ---
if [ -f quadJSONsmall.py.bak ]; then
    echo "Migrating old backup file to new naming scheme..."
    mv quadJSONsmall.py.bak quadJSONsmall.py.bak.original
fi
# --- End migration ---

# Check if the active file is the Gemini version by looking for the "# Refactored by Gemini" comment
if [ -f quadJSONsmall.py ] && [[ $(head -n 1 quadJSONsmall.py) == *Gemini* ]]; then
    echo "Switching to Original Version"
    # Deactivate Gemini version by renaming it to its unique name
    mv quadJSONsmall.py quadJSONsmall_toggle.py
    # Activate Original version by renaming it to the generic name
    mv quadJSONsmall.py.bak.original quadJSONsmall.py
    echo "Active version is now Original."
# Otherwise, the active file must be the original
else
    echo "Switching to Refactored (Gemini) Version"
    # Deactivate Original version by renaming it to its unique name
    mv quadJSONsmall.py quadJSONsmall.py.bak.original
    # Activate Gemini version by renaming it to the generic name
    mv quadJSONsmall_toggle.py quadJSONsmall.py
    echo "Active version is now Gemini."
fi
