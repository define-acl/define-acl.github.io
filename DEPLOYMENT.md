# 🚀 Quick Deployment Guide

## Step 1: Customize Your Content

### Update Links (Required)
In `index.html`, find these lines and replace with your actual URLs:

```html
<!-- Line ~44 -->
<a href="#" class="link-button" id="arxiv-link">
<!-- Change to: -->
<a href="https://arxiv.org/abs/YOUR_PAPER_ID" class="link-button" id="arxiv-link">

<!-- Line ~48 -->
<a href="#" class="link-button" id="github-link">
<!-- Change to: -->
<a href="https://github.com/YOUR_USERNAME/YOUR_REPO" class="link-button" id="github-link">

<!-- Line ~52 -->
<a href="#" class="link-button" id="huggingface-link">
<!-- Change to: -->
<a href="https://huggingface.co/YOUR_MODEL" class="link-button" id="huggingface-link">
```

### Update Citation (Required)
In `index.html`, find the BibTeX section (~line 200) and update:

```bibtex
@article{hu2024define,
  title={DeFine: Decision-Making with Analogical Reasoning over Factor Profiles},
  author={Hu, Yebowen and Wang, Xiaoyang and Yao, Wenlin and Lu, Yiming and Zhang, Daoan and Foroosh, Hassan and Yu, Dong and Liu, Fei},
  journal={arXiv preprint arXiv:2024.YOUR_ID},
  year={2024}
}
```

## Step 2: Deploy to GitHub Pages

### Option A: New Repository
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select source: Deploy from a branch
5. Choose branch: `main` and folder: `/ (root)`
6. Click Save

### Option B: Existing Repository
1. Push all files to your existing repository
2. Follow steps 3-6 from Option A

## Step 3: Verify Deployment

Your site will be available at:
- `https://YOUR_USERNAME.github.io/REPOSITORY_NAME`

## Common Issues & Solutions

### Issue: Images not loading
- **Solution**: Check that all images are in the `assets/` folder
- **Verify**: File names match exactly (case-sensitive)

### Issue: Fonts not loading
- **Solution**: Fonts load from Google Fonts CDN - check internet connection

### Issue: CSS/JS not working
- **Solution**: Verify all files are in the root directory
- **Check**: `styles.css` and `script.js` are in the same folder as `index.html`

## File Structure (Must maintain)

```
your-repo/
├── index.html           ← Main page
├── styles.css           ← Styles
├── script.js            ← Interactions
├── assets/              ← Images
│   ├── example_framework.png
│   ├── confusion_matrix.png
│   ├── k_analysis.png
│   └── outcome_analysis.png
├── .nojekyll           ← GitHub Pages config
└── README.md           ← Documentation
```

## 🎯 Quick Test

After deployment, test these features:
- [ ] All tabs switch smoothly
- [ ] Images load correctly
- [ ] External links work
- [ ] BibTeX copy button works
- [ ] Mobile responsive design

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify all file paths are correct
3. Ensure repository is public
4. Wait 5-10 minutes for GitHub Pages to update

**Ready to deploy? Just update the links and push to GitHub!** 🚀