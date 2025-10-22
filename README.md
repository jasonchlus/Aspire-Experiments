# Aspire Launch Countdown - Static Website

A simple, elegant countdown timer for the .NET Aspire launch on October 27, 2025 at 12:00 UTC.

## Features

- 🕐 Live countdown timer to launch date
- 🎨 Beautiful purple gradient theme matching Aspire branding
- 🎥 Background video that plays every 60 seconds at 0.25x speed
- 📱 Fully responsive design
- 🚀 Pure HTML/CSS/JavaScript - no build tools required

## Files

- `index.html` - Main HTML structure
- `style.css` - All styles with Aspire purple theme
- `script.js` - Countdown timer logic and video playback
- `images/` - Contains fowler-boom.gif and Aspire_GFX_Transition_V2.mp4

## Local Testing

Simply open `index.html` in any modern web browser. No server required!

## Deployment Options

### Option 1: GitHub Pages (Recommended - Free)

1. Create a new GitHub repository
2. Upload all files from the `static-site` folder
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose `main` branch
5. Your site will be live at `https://yourusername.github.io/reponame`

### Option 2: Netlify (Free)

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop the `static-site` folder onto Netlify
3. Your site will be live instantly with a custom URL

### Option 3: Azure Static Web Apps (Free Tier Available)

1. Install Azure CLI: `winget install Microsoft.AzureCLI`
2. Login: `az login`
3. Create resource group: `az group create --name aspire-countdown-rg --location eastus2`
4. Deploy:
   ```powershell
   az staticwebapp create `
     --name aspire-countdown `
     --resource-group aspire-countdown-rg `
     --source . `
     --location eastus2 `
     --branch main `
     --app-location "/" `
     --output-location "/"
   ```

### Option 4: Cloudflare Pages (Free)

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repo or upload files directly
3. Deploy with zero configuration

## Launch Date

**October 27, 2025 at 12:00:00 UTC**

To change the launch date, edit `script.js` and update the `LAUNCH_DATE` constant.

## Credits

- Created for the .NET Aspire community
- Reaction GIF: Martin Fowler
- Background video: Microsoft Aspire branding assets
