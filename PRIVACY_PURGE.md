# Privacy Purge & Lifetime Maintenance Guide

## 1. What Was Secured in This Overhaul

### Private Assets Staging
- All sensitive scanned academic credentials (`student_card_qau.jpeg`, `bs_degree_pu.jpg`, `transcript_pu.jpg`, `fsc_premed.jpg`, `matric_science.jpg`, `experience_unique.jpg`, `experience_educators.jpg`, `naat_competition_green_uni.jpg`, etc.) and confidential MPhil thesis drawings have been moved into:
  ```
  private_upload/
  ```
- `private_upload/` is added to `.gitignore` and is **never** committed or bundled into public builds.

### Academic CV Alignment
- The public CV has been updated with the user's latest verified credentials and compiled directly to:
  - [public/cv/KAMRAN-ASHRAF-CV.pdf](file:///c:/Users/hamda/OneDrive/Desktop/Kamran_Portfolio/public/cv/KAMRAN-ASHRAF-CV.pdf)
  - [public/cv/KAMRAN-ASHRAF-CV.docx](file:///c:/Users/hamda/OneDrive/Desktop/Kamran_Portfolio/public/cv/KAMRAN-ASHRAF-CV.docx)
- All degrees, institutions, GPA/grades, and dates are aligned with the official records.

### Thesis & IP Protection
- The public site no longer leaks the specific chemical formulas, MOF dopants, reaction intermediate diagrams, or thesis mechanics.
- Research is described in general scientific terms (*Electrocatalysis*, *Computational DFT modelling*, *Zinc–Air kinetics*, *Biopolymeric sorbents*).
- Specific papers and documents are locked behind the **Confidential Vault** workflow.

---

## 2. Optional: Purging Historic Git Commits

Because previous git commits in your repository history may still hold copies of the older image files, you can permanently scrub them from git history before pushing to GitHub.

> [!CAUTION]
> Git history rewriting changes commit hashes. Run these commands only when you are ready to rewrite history on your remote repository.

### Option A: Using `git-filter-repo` (Recommended)
1. Install `git-filter-repo` (requires Python):
   ```bash
   pip install git-filter-repo
   ```
2. Run the filter to remove the old doc and research image folders from history:
   ```bash
   git filter-repo --invert-paths \
     --path legacy/assets/images/docs \
     --path legacy/assets/images/research \
     --path public/assets/images/docs \
     --path public/assets/images/research
   ```
3. Re-add your git remote (git-filter-repo clears remotes as a safety feature):
   ```bash
   git remote add origin https://github.com/Kamran5H/Portfolio.git
   ```
4. Force push to your branch:
   ```bash
   git push origin main --force
   ```

---

## 3. Lifetime Maintenance: Editing Content in `content/*.json`

You do **not** need to touch TypeScript or React code to update your portfolio over the coming years:

1. **[content/site.json](file:///c:/Users/hamda/OneDrive/Desktop/Kamran_Portfolio/content/site.json)**:
   - Name, tagline, location, bio, social links, educational timeline, and technology stack.
2. **[content/projects.json](file:///c:/Users/hamda/OneDrive/Desktop/Kamran_Portfolio/content/projects.json)**:
   - Add, remove, or modify your flagship projects.
   - Assign any of the 3D models: `"phone"`, `"papers"`, `"envelope"`, `"disk"`, `"morph"`, `"book"`, `"funnel"`, `"prism"`, `"atom"`.
3. **[content/lab.json](file:///c:/Users/hamda/OneDrive/Desktop/Kamran_Portfolio/content/lab.json)**:
   - Add micro-tools, Python scripts, or experiments.
   - Set `"locked": true` on any private IP tool to automatically show a lock badge and prompt visitors to request access.
4. **[content/vault.json](file:///c:/Users/hamda/OneDrive/Desktop/Kamran_Portfolio/content/vault.json)**:
   - Add or modify credentials, research dossiers, and restricted manuscripts available for email-verified access.

### Validating Content
Whenever you edit any `content/*.json` file, run:
```bash
npm run content:check
```
It will immediately validate the syntax and notify you if any required field is missing.
