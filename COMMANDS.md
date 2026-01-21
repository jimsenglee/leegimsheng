# Portfolio Project Commands (Windows PowerShell)

## Start Local Server
```powershell
cd "c:\My Web Sites\Portfolio1\yeshwanth.online"
npx -y serve . -p 3000
```
Open browser: http://localhost:3000

---

## Push Changes to GitHub

### Step 1: Add files
```powershell
git add .
```

### Step 2: Commit
```powershell
git commit -m "Your message here"
```

### Step 3: Push
```powershell
git push origin main
```

---

## Deploy to Vercel (Cloud)

### Option 1: Automatic (Recommended)
Simply **Push to GitHub** using the steps above. Vercel will automatically detect the changes and rebuild your site.

### Option 2: Manual Command
Use this if you want to force a deployment immediately from your terminal.

**Step 1: Install Vercel CLI (If not installed)**
```powershell
npm install -g vercel
```

**Step 2: Deploy to Production**
```powershell
npx vercel --prod
```
*Note: The first time you run this, it will ask you to login and link your project. Follow the prompts in the terminal.*

### Option 3: Check via Vercel Dashboard (UI)
If your site is not showing up, follow these steps on [vercel.com](https://vercel.com):

1. **Click on your project name** (`leegimsheng`) to open the project overview.
2. **Go to the "Deployments" tab** at the top.
3. **Check the status**:
   - If it says **"Ready"**, your site is live! Click the link to view it.
   - If it says **"Building"**, wait a few seconds.
   - If it says **"Error"**, click on it to see why it failed (usually a missing file or high-security setting).
4. **Trigger a Manual Redeploy**: If nothing is happening, click the **"..."** (three dots) on the latest deployment and select **"Redeploy"**.

---

## First Time Setup (Only Once)

### Initialize git
```powershell
git init
```

### Add remote
```powershell
git remote add origin https://github.com/jimsenglee/leegimsheng.git
```

### Set branch name
```powershell
git branch -M main
```

### Login to GitHub
```powershell
gh auth login
```

---

## Check Status
```powershell
git status
```

## View Commit History
```powershell
git log -n 5
```
