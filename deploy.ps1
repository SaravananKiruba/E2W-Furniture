# E2W Furniture Deployment Script
# This script ensures a clean deployment with proper cache busting

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  E2W Furniture Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean old build
Write-Host "[1/5] Cleaning old build files..." -ForegroundColor Yellow
if (Test-Path "build") {
    Remove-Item -Recurse -Force build
    Write-Host "✓ Old build files removed" -ForegroundColor Green
} else {
    Write-Host "✓ No old build files found" -ForegroundColor Green
}
Write-Host ""

# Step 2: Verify dependencies
Write-Host "[2/5] Verifying dependencies..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
}
Write-Host ""

# Step 3: Build application
Write-Host "[3/5] Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build completed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Build failed! Please check errors above." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 4: Deploy to GitHub Pages
Write-Host "[4/5] Deploying to GitHub Pages..." -ForegroundColor Yellow
npm run deploy
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Deployment completed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Deployment failed! Please check errors above." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 5: Completion
Write-Host "[5/5] Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Wait 2-3 minutes for GitHub Pages to update" -ForegroundColor White
Write-Host "2. Open your site: https://saravanankiruba.github.io/E2W-Furniture" -ForegroundColor White
Write-Host "3. Hard refresh your browser (Ctrl + F5)" -ForegroundColor White
Write-Host "4. Verify colors are displaying correctly" -ForegroundColor White
Write-Host ""
Write-Host "If colors don't appear correctly:" -ForegroundColor Yellow
Write-Host "- Clear browser cache (Ctrl + Shift + Delete)" -ForegroundColor Yellow
Write-Host "- Try in an incognito/private window" -ForegroundColor Yellow
Write-Host ""
Write-Host "✓ Deployment script completed!" -ForegroundColor Green
Write-Host ""
