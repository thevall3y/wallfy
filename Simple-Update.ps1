# Simple script to update files on GitHub using Basic Authentication
# Replace these variables with your actual information

# GitHub credentials
$githubUsername = "REPLACE_WITH_YOUR_USERNAME"
$personalAccessToken = "REPLACE_WITH_YOUR_TOKEN"  # Get this from https://github.com/settings/tokens

# Repository details
$repositoryName = "wallfy"
$branchName = "main"

# Basic authentication header
$base64Auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$($githubUsername):$($personalAccessToken)"))
$headers = @{
    Authorization = "Basic $base64Auth"
}

# Function to update a file on GitHub
function Update-GitHubFile {
    param(
        [string]$FilePath,
        [string]$LocalFilePath
    )
    
    # Step 1: Get the current file (to get its SHA)
    $url = "https://api.github.com/repos/$githubUsername/$repositoryName/contents/$FilePath"
    
    try {
        # Get current file info (including SHA)
        $response = Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing
        $fileInfo = $response.Content | ConvertFrom-Json
        $fileSha = $fileInfo.sha
        
        # Read file content
        $content = Get-Content -Path $LocalFilePath -Raw -Encoding UTF8
        
        # Convert to Base64
        $contentBytes = [System.Text.Encoding]::UTF8.GetBytes($content)
        $encodedContent = [Convert]::ToBase64String($contentBytes)
        
        # Create request body
        $body = @{
            message = "Update $FilePath [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"
            content = $encodedContent
            sha = $fileSha
            branch = $branchName
        } | ConvertTo-Json
        
        # Update the file
        $updateResponse = Invoke-WebRequest -Uri $url -Method Put -Headers $headers -Body $body -UseBasicParsing
        
        Write-Host "Successfully updated $FilePath" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "Failed to update $FilePath. Error: $_" -ForegroundColor Red
        return $false
    }
}

# Update the files
$filesToUpdate = @(
    @{ Path = "index.html"; LocalPath = ".\index.html" },
    @{ Path = "admin.html"; LocalPath = ".\admin.html" },
    @{ Path = "vercel.json"; LocalPath = ".\vercel.json" }
)

foreach ($file in $filesToUpdate) {
    Write-Host "Updating $($file.Path)..." -ForegroundColor Yellow
    $result = Update-GitHubFile -FilePath $file.Path -LocalFilePath $file.LocalPath
}

Write-Host "`nUpdate complete. Vercel should automatically deploy your changes." -ForegroundColor Cyan 