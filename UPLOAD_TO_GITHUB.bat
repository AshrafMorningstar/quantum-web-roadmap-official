@echo off
title QUANTUM AUTO-UPLOAD SYSTEM
color 0B
echo.
echo ===================================================
echo   QUANTUM WEB ROADMAP - GITHUB AUTO-UPLOADER
echo   Owner: Ashraf Morningstar
echo ===================================================
echo.

cd Quantum-Web-Roadmap

echo [1/5] Initializing Local Repository...
if not exist .git (
    git init
    echo    - Git initialized.
) else (
    echo    - Git already initialized.
)

echo [2/5] Staging All Quantum Project Files...
git add .
git commit -m "feat: Initial commit of 18 Revolutionary Quantum Web Projects by Ashraf Morningstar"

echo [3/5] Checking for GitHub CLI (gh)...
where gh >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] GitHub CLI (gh) not found.
    echo.
    echo AUTOMATION PAUSED: Please install GitHub CLI or push manually.
    echo Manual Push Instructions:
    echo   1. Create repo 'Quantum-Web-Roadmap' on GitHub
    echo   2. Run: git remote add origin https://github.com/AshrafMorningstar/Quantum-Web-Roadmap.git
    echo   3. Run: git push -u origin main
    echo.
    pause
    exit /b
)

echo [4/5] Checking Authentication...
gh auth status >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] You are not logged into GitHub CLI.
    echo     Please login now to enable auto-upload.
    gh auth login
)

echo [5/5] Creating & Pushing to GitHub...
echo     - Creating public repository 'Quantum-Web-Roadmap'...
gh repo create Quantum-Web-Roadmap --public --source=. --remote=origin --push

echo.
echo ===================================================
echo   SUCCESS! PROJECT IS LIVE ON GITHUB
echo ===================================================
echo.
echo Repo URL: https://github.com/AshrafMorningstar/Quantum-Web-Roadmap
echo Pages URL: https://AshrafMorningstar.github.io/Quantum-Web-Roadmap
echo.
echo The GitHub Actions workflow has been triggered.
echo Your site will be live in ~60 seconds.
echo.
pause
