# Push AutoBreeze nextjs to https://github.com/it-techmonkey/autobreeze
# Run this script in PowerShell from the nextjs folder after closing other Git/IDE usage.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Remove stale lock if present
$lock = ".git\index.lock"
if (Test-Path $lock) {
    Remove-Item $lock -Force
    Write-Host "Removed stale index.lock"
}

# Ensure remote exists
$remotes = git remote 2>$null
if ($remotes -notmatch "origin") {
    git remote add origin https://github.com/it-techmonkey/autobreeze.git
}

# Stage and commit (only if there are changes)
git add -A
$status = git status --short
if ($status) {
    git commit -m "Initial commit: AutoBreeze Luxury Next.js app"
    git branch -M main
    git push -u origin main
} else {
    Write-Host "No changes to commit. Pushing existing commits..."
    git branch -M main
    git push -u origin main
}

Write-Host "Done. Check https://github.com/it-techmonkey/autobreeze"
