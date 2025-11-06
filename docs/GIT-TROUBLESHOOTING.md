# Git Troubleshooting Guide

## Common Git Commit Problems and Solutions

### 🚨 Problem 1: Git Index Lock File Error

**Error Message:**
```
fatal: Unable to create 'C:/path/to/.git/index.lock': File exists.
Another git process seems to be running in this repository...
```

**Root Cause:** Another git process crashed or was terminated unexpectedly, leaving a lock file.

**Solution:**
```powershell
# Windows PowerShell
Remove-Item -Force .git\index.lock -ErrorAction SilentlyContinue

# Linux/Mac
rm -f .git/index.lock
```

**Then retry your git command:**
```bash
git add .
git commit -m "Your commit message"
```

---

### 🔄 Problem 2: Git Commit History Swap/Overlap

**Symptoms:**
- Commits appear out of order
- Local commits don't match remote commits
- "Your branch is ahead/behind origin" messages

**Diagnosis Commands:**
```bash
# Check local vs remote status
git status

# View commit history
git log --oneline -5

# Compare with remote
git log --oneline origin/main -5

# Check differences
git diff HEAD origin/main
```

**Solution A: Simple Push (when local is ahead):**
```bash
git push origin main
```

**Solution B: Pull and Merge (when remote is ahead):**
```bash
git pull origin main
# Resolve any conflicts if they appear
git push origin main
```

**Solution C: Force Push (⚠️ DANGEROUS - use only if you're sure):**
```bash
git push --force-with-lease origin main
```

---

### 📝 Problem 3: Changes Not Being Staged

**Symptoms:**
- Made changes but `git status` shows "working tree clean"
- Files aren't being picked up by `git add .`

**Diagnosis:**
```bash
# Check what files are actually modified
git diff --name-only

# Check for untracked files
git status --porcelain

# See all changes including ignored files
git status --ignored
```

**Solutions:**
```bash
# Force add specific files
git add path/to/your/file.js

# Add all changes including new files
git add -A

# Check .gitignore isn't excluding your files
cat .gitignore
```

---

### 🔧 Problem 4: Merge Conflicts During Commit

**Error Message:**
```
CONFLICT (content): Merge conflict in filename.ext
Automatic merge failed; fix conflicts and then commit the result.
```

**Solution Steps:**

1. **Find conflicted files:**
```bash
git status
```

2. **Open each conflicted file and look for:**
```
<<<<<<< HEAD
Your changes
=======
Incoming changes
>>>>>>> branch-name
```

3. **Manually resolve conflicts by choosing which code to keep**

4. **Stage resolved files:**
```bash
git add resolved-file.ext
```

5. **Complete the merge:**
```bash
git commit -m "Resolve merge conflicts"
```

---

### 🚀 Problem 5: Accidentally Committed Wrong Files

**Solution A: Undo Last Commit (keep changes):**
```bash
git reset --soft HEAD~1
```

**Solution B: Undo Last Commit (discard changes):**
```bash
git reset --hard HEAD~1
```

**Solution C: Amend Last Commit:**
```bash
# Stage new changes
git add .
# Amend the commit
git commit --amend -m "New commit message"
```

---

### 📊 Problem 6: Branch Divergence Issues

**Error Message:**
```
Your branch and 'origin/main' have diverged,
and have X and Y different commits each, respectively.
```

**Solution:**
```bash
# Option 1: Rebase (cleaner history)
git pull --rebase origin main

# Option 2: Merge (preserves history)
git pull origin main

# Then push
git push origin main
```

---

### 🔍 Emergency Diagnostics

**When everything seems broken, run these:**

```bash
# 1. Check repository status
git status

# 2. Check recent commits
git log --oneline -10

# 3. Check remote status
git remote -v
git fetch origin
git status

# 4. Check for lock files
ls -la .git/*.lock 2>/dev/null || echo "No lock files found"

# 5. Check git configuration
git config --list | grep -E "(user|remote)"
```

---

### 🛠️ Best Practices to Avoid Issues

1. **Always check status before committing:**
```bash
git status
git diff --cached  # See what you're about to commit
```

2. **Use meaningful commit messages:**
```bash
git commit -m "fix: Resolve login form icon overlap issue

- Increase left padding from 45px to 50px
- Adjust icon position for better alignment
- Fix CSS specificity conflicts

Fixes #123"
```

3. **Commit frequently with small changes:**
```bash
# Better: Multiple small commits
git add frontend/css/styles.css
git commit -m "fix: Login form icon spacing"

git add frontend/js/script.js  
git commit -m "feat: Implement logout functionality"
```

4. **Pull before pushing:**
```bash
git pull origin main
git push origin main
```

5. **Use branches for features:**
```bash
git checkout -b feature/logout-fix
# Make changes
git commit -m "Implement logout fix"
git checkout main
git merge feature/logout-fix
```

---

### 🆘 When All Else Fails

**Nuclear Option (⚠️ LAST RESORT):**

1. **Backup your changes:**
```bash
cp -r project-folder project-folder-backup
```

2. **Fresh clone:**
```bash
git clone https://github.com/username/repository.git fresh-repo
cd fresh-repo
```

3. **Manually copy your changes from backup**

4. **Commit normally:**
```bash
git add .
git commit -m "Restore changes after git issues"
git push origin main
```

---

### 📞 Quick Reference Commands

| Problem | Command |
|---------|---------|
| Remove lock file | `rm -f .git/index.lock` |
| Undo last commit | `git reset --soft HEAD~1` |
| Force push | `git push --force-with-lease origin main` |
| Pull with rebase | `git pull --rebase origin main` |
| Check status | `git status` |
| View history | `git log --oneline -10` |
| Stage all changes | `git add -A` |
| Amend commit | `git commit --amend` |

---

*Last Updated: November 5, 2025*  
*This guide covers the most common git issues encountered during development.*