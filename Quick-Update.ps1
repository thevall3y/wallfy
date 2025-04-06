# Quick Update Script for GitHub/Vercel
# --------------------------------
# EDIT THESE VALUES:
$username = "YOUR_GITHUB_USERNAME"
$token = "YOUR_GITHUB_TOKEN"  # Generate at https://github.com/settings/tokens
$repo = "wallfy"               # Your repository name
# --------------------------------

# Create authentication header
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$username`:$token"))
$headers = @{
    Authorization = "Basic $auth"
    Accept = "application/vnd.github.v3+json"
}

# Helper function to update a file
function Update-File($path) {
    Write-Host "Updating $path..." -ForegroundColor Yellow
    
    # Get current file to obtain SHA (required by GitHub)
    $url = "https://api.github.com/repos/$username/$repo/contents/$path"
    try {
        $response = Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing
        $currentFile = $response.Content | ConvertFrom-Json
        $sha = $currentFile.sha
        
        # Read local file
        $content = Get-Content $path -Raw
        $encodedContent = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($content))
        
        # Prepare update request
        $body = @{
            message = "Update $path via PowerShell script"
            content = $encodedContent
            sha = $sha
        } | ConvertTo-Json
        
        # Send update request
        $updateResponse = Invoke-WebRequest -Uri $url -Method Put -Headers $headers -Body $body -UseBasicParsing
        Write-Host "  Success! $path updated." -ForegroundColor Green
    }
    catch {
        Write-Host "  Failed to update $path. Error: $_" -ForegroundColor Red
    }
}

# Update main files
Write-Host "Starting GitHub update..." -ForegroundColor Cyan
Update-File "index.html"
Update-File "admin.html"
Update-File "vercel.json"

Write-Host "`nAll updates completed!" -ForegroundColor Cyan
Write-Host "Vercel should automatically deploy your changes within a few minutes." -ForegroundColor Cyan 