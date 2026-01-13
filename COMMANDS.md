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
