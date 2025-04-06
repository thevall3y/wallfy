# Script to update GitHub repository and trigger Vercel deployment
# You'll need to update these variables with your information

# GitHub settings
$githubUsername = "<YOUR_GITHUB_USERNAME>"
$repositoryName = "wallfy"
$branchName = "main"
$personalAccessToken = "<YOUR_GITHUB_TOKEN>"  # Generate this at https://github.com/settings/tokens

# Files to update - adjust these paths as needed
$filesToUpdate = @(
    @{
        path = "index.html"
        localPath = ".\index.html"
    },
    @{
        path = "admin.html"
        localPath = ".\admin.html"
    },
    @{
        path = "vercel.json"
        localPath = ".\vercel.json"
    }
)

# Create Auth header for GitHub API
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$($githubUsername):$($personalAccessToken)"))
$headers = @{
    "Authorization" = "Basic $base64AuthInfo"
    "Accept" = "application/vnd.github.v3+json"
}

Write-Host "Starting update process..." -ForegroundColor Green

foreach ($file in $filesToUpdate) {
    Write-Host "Updating $($file.path)..." -ForegroundColor Yellow
    
    # First, get the current file to get its SHA (needed for updating)
    $apiUrl = "https://api.github.com/repos/$githubUsername/$repositoryName/contents/$($file.path)"
    
    try {
        $fileInfo = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
        $fileSha = $fileInfo.sha
        
        # Read the local file content
        $fileContent = Get-Content -Path $file.localPath -Raw
        
        # Convert to Base64 for GitHub API
        $fileContentBase64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($fileContent))
        
        # Prepare the update payload
        $updateBody = @{
            message = "Update $($file.path) via PowerShell"
            content = $fileContentBase64
            sha = $fileSha
            branch = $branchName
        } | ConvertTo-Json
        
        # Update the file
        $updateResult = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Put -Body $updateBody
        
        Write-Host "  ✅ $($file.path) updated successfully!" -ForegroundColor Green
    }
    catch {
        Write-Host "  ❌ Error updating $($file.path): $_" -ForegroundColor Red
    }
}

Write-Host "`nAll files updated! Vercel should automatically deploy the changes." -ForegroundColor Green
Write-Host "Check your Vercel dashboard to monitor the deployment status." -ForegroundColor Green 