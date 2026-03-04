param(
    [Parameter(Mandatory=$true)]
    [string]$GithubUsername
)

Write-Host "Setting up Git repository for FlowNote..." -ForegroundColor Cyan

# Initialize Git
git init
git add .
git commit -m "Initial commit of FlowNote from Antigravity"

# Add remote and push
$RemoteUrl = "https://github.com/$GithubUsername/flownote.git"
Write-Host "Adding remote origin: $RemoteUrl" -ForegroundColor Cyan
git remote add origin $RemoteUrl

Write-Host "Pushing to main branch..." -ForegroundColor Cyan
git branch -M main
git push -u origin main

Write-Host "Done! Connected to GitHub." -ForegroundColor Green
