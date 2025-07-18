# DeFine: Decision-Making with Analogical Reasoning over Factor Profiles

This is the official website for the DeFine research paper, showcasing our novel framework for decision-making with analogical reasoning over factor profiles.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Liquid Flow Navigation**: Smooth, animated tab switching with liquid morphing effects
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content loading
- **Accessibility**: Keyboard navigation support and screen reader friendly
- **Modern UI**: Clean, academic-focused design with professional aesthetics

## 📁 Project Structure

```
define-acl.github.io/
├── index.html              # Main HTML file
├── styles.css              # CSS styles with animations
├── script.js               # JavaScript functionality
├── assets/                 # Images and media files
│   ├── example_framework_hd.png
│   ├── confusion_matrix.png
│   ├── outcome_likelihood_hd.png
│   ├── k_analysis.png
│   ├── outcome_analysis.png
│   ├── hf-logo.svg
│   └── NVDA_2024-05-22.json
├── figs/                   # Original PDF figures
│   ├── Example.pdf
│   ├── confusion_matrix_colored.pdf
│   ├── kld_majority_vote.pdf
│   └── outcome_likelihood.pdf
└── README.md               # This file
```

## 🛠️ Setup Instructions

1. **Clone or download** this repository
2. **Update links** in `index.html`:
   - Replace `#` in ArXiv, GitHub, and HuggingFace links with your actual URLs
   - Update email addresses if needed
3. **Customize content** as needed
4. **Deploy** to your preferred hosting platform

## 🔧 Customization Guide

### Updating Author Information
Edit the author links in `index.html` around line 25-35:
```html
<a href="mailto:your-email@university.edu" class="author-link">Your Name<sup>1</sup></a>
```

### Adding External Links
Replace the placeholder links in the paper-links section:
```html
<a href="https://arxiv.org/abs/your-paper-id" class="link-button" id="arxiv-link">
<a href="https://github.com/your-username/your-repo" class="link-button" id="github-link">
<a href="https://huggingface.co/your-model" class="link-button" id="huggingface-link">
```

**Note**: The HuggingFace link now uses a custom SVG logo (`assets/hf-logo.svg`) instead of FontAwesome icons for better brand consistency.

### Updating Citation Information
Modify the BibTeX citation in `index.html` around line 200:
```bibtex
@article{hu2024define,
  title={DeFine: Decision-Making with Analogical Reasoning over Factor Profiles},
  author={...},
  journal={arXiv preprint arXiv:2024.xxxxx},
  year={2024}
}
```

### Changing Colors
Primary colors can be modified in `styles.css`:
- `#064A6C` - Primary blue
- `#FF6B35` - Accent orange
- `#EFEDE1` - Light background

## 🎨 Design Features

### Liquid Flow Animation
The navigation tabs feature a unique liquid morphing animation created with CSS transforms and cubic-bezier transitions.

### Responsive Grid Layout
The layout automatically adapts to different screen sizes using CSS Grid and Flexbox.

### Smooth Scrolling
Implemented with JavaScript for cross-browser compatibility.

### Interactive Elements
- Hover effects on buttons and cards
- Smooth section transitions
- Copy-to-clipboard functionality for BibTeX

## 🌐 GitHub Pages Deployment

This website is optimized for GitHub Pages deployment. Follow these steps:

### Quick Deployment
1. **Fork or clone** this repository
2. **Update your content**:
   - Replace `#` placeholders with your actual ArXiv, GitHub, and HuggingFace links
   - Update author email addresses if needed
   - Modify the BibTeX citation with your paper details
3. **Push to GitHub** (repository name should be `your-username.github.io` or any name for project pages)
4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Select source branch (usually `main`)
   - Select root directory `/`
5. **Your site will be live** at `https://your-username.github.io/repository-name`

### ✨ New Features Added
- **Interactive Factor Profile**: Real-time loading and visualization of NVIDIA earnings call factor analysis
- **Enhanced Section Styling**: Improved layouts for Abstract, Framework, Essential Factors, and Results
- **Responsive Data Visualization**: Beautiful tables, charts, and statistical displays
- **Sliding Animations**: Smooth section transitions with water drop effects
- **Custom HuggingFace Logo**: High-quality SVG logo for better brand consistency
- **Interactive Factor Descriptions**: Call-out box with typewriter effect for factor explanations
- **High-Resolution Graphics**: Converted PDF figures to high-quality PNG for better web display

### Important Notes for GitHub Pages
- ✅ All paths are relative and will work correctly
- ✅ Images are optimized and compressed
- ✅ External fonts and icons load from CDN
- ✅ No server-side processing required
- ✅ Mobile-responsive design
- ✅ `.nojekyll` file included to prevent Jekyll processing

### Alternative Deployment
- **Netlify**: Drag and drop the project folder
- **Vercel**: Import your GitHub repository

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

If you find any issues or have suggestions for improvements, please feel free to:
1. Open an issue
2. Submit a pull request
3. Contact the authors

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions about the research or website, please contact:
- Yebowen Hu: yebowen.hu@ucf.edu
- Fei Liu: fei.liu@emory.edu

---

**Note**: Remember to update all placeholder links and information before deploying to production!