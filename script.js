// DeFine Website Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initializeTabNavigation();
    initializeAnimations();
    initializeCopyButton();
    initializeImageLazyLoading();
    initializeAccessibility();
    initializeFactorProfile();
    initializeFactorCallout();
});

// Tab Navigation with Simple Fade Effects
function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentSections = document.querySelectorAll('.content-section');

    tabButtons.forEach((button, buttonIndex) => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const targetSection = document.getElementById(targetTab);
            
            if (!targetSection) return;
            
            // Don't do anything if clicking the same tab
            if (this.classList.contains('active')) return;
            
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and target section
            this.classList.add('active');
            targetSection.classList.add('active');

            // Load companies when demo tab is clicked
            if (targetTab === 'demo') {
                console.log('Demo tab selected, loading companies...');
                setTimeout(() => {
                    console.log('Loading companies after tab animation...');
                    loadCompanies();
                }, 100);
            }

            // Analytics tracking (if implemented)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'tab_click', {
                    'event_category': 'Navigation',
                    'event_label': targetTab
                });
            }
        });
    });
}

// Smooth Animations and Loading Effects
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                // Add staggered animation for multiple items
                const items = entry.target.querySelectorAll('.stat-item, .step-card, .result-card');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = `fadeIn 0.6s ease-in-out ${index * 0.2}s both`;
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

    // Removed parallax effect to prevent header shaking

    // Liquid flow animation enhancement
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const liquidBg = this.querySelector('.liquid-bg');
            if (liquidBg) {
                liquidBg.style.animation = 'liquidPulse 0.8s ease-in-out';
            }
        });

        button.addEventListener('mouseleave', function() {
            const liquidBg = this.querySelector('.liquid-bg');
            if (liquidBg) {
                liquidBg.style.animation = '';
            }
        });
    });
}

// Copy BibTeX Functionality
function initializeCopyButton() {
    const copyButton = document.querySelector('.copy-button');
    const bibtexContent = document.getElementById('bibtex-content');

    if (copyButton && bibtexContent) {
        copyButton.addEventListener('click', function() {
            copyBibTeX();
        });
    }
}

function copyBibTeX() {
    const bibtexContent = document.getElementById('bibtex-content');
    const copyButton = document.querySelector('.copy-button');
    
    if (bibtexContent && copyButton) {
        // Create temporary textarea for copying
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = bibtexContent.textContent.trim();
        document.body.appendChild(tempTextarea);
        
        // Select and copy
        tempTextarea.select();
        tempTextarea.setSelectionRange(0, 99999); // For mobile
        
        try {
            document.execCommand('copy');
            
            // Visual feedback
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
            copyButton.style.background = '#2ECC71';
            
            setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.style.background = '#064A6C';
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback for modern browsers
            if (navigator.clipboard) {
                navigator.clipboard.writeText(bibtexContent.textContent.trim())
                    .then(() => {
                        console.log('BibTeX copied successfully');
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                    });
            }
        }
        
        document.body.removeChild(tempTextarea);
    }
}

function copyPrompt() {
    const copyButton = document.querySelector('.copy-prompt-button');
    
    // Define the complete prompt text with proper formatting
    const promptText = `**System Message**

You're a financial analyst who specializes in giving investors buy or sell recommendations by thoroughly analyzing earnings call transcripts.

**User Message**

Here are several example company profiles. Each profile highlights key factors from an earnings call transcript and probabilities for potential outcomes based on those factors. Each profile represents a specific company and is based on its historical earnings call data. Your job is to pick the most analogous example and use its strategy to solve the initial problem.

Example Company Profile 1:
{Factor Profile 1}
Analyst recommendation: {Action 1}

Example Company Profile 2:
{Factor Profile 2}
Analyst recommendation: {Action 2}

Example Company Profile 3:
{Factor Profile 3}
Analyst recommendation: {Action 3}

Example Company Profile 4:
{Factor Profile 4}
Analyst recommendation: {Action 4}

Example Company Profile 5:
{Factor Profile 5}
Analyst recommendation: {Action 5}

**Initial Problem**

Based on your analysis of the earnings call for {Company Name} held on {Announcement Date}, decide on the most likely analyst recommendation for the next 30 days from these options:

- Action 1: strong buy: The stock price will increase by more than 5%
- Action 2: buy: The stock price will increase by 2% to 5%
- Action 3: hold: The stock price is expected to remain stable, fluctuating between -2% to 2%
- Action 4: sell: The stock price will decrease by 2% to 5%
- Action 5: strong sell: The stock price will decrease by more than 5%

Below is the company profile summarized from {Company Name}'s earnings call on {Announcement Date} and the historical price trend probabilities judged by an analyst:

{Factor Profile Constructed Using an Earnings Call Transcript}

**Solve the Initial Problem**

Please respond with the analyst recommendation for this stock in JSON format, including these keys: (\`idx\`, \`recommendation\`, \`justification\`). \`idx\` is the index of the most analogous example profile, and \`recommendation\` should be one of the actions mentioned above for 30 days of trading, and \`justification\` should clearly explain your recommendation using the strategy you learned from the selected example company profile.`;

    if (copyButton) {
        // Create temporary textarea for copying
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = promptText;
        document.body.appendChild(tempTextarea);
        
        // Select and copy
        tempTextarea.select();
        tempTextarea.setSelectionRange(0, 99999); // For mobile
        
        try {
            document.execCommand('copy');
            
            // Visual feedback
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
            copyButton.style.background = 'rgba(46, 204, 113, 0.3)';
            copyButton.style.borderColor = 'rgba(46, 204, 113, 0.5)';
            
            setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.style.background = 'rgba(255, 255, 255, 0.2)';
                copyButton.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy prompt: ', err);
            // Fallback for modern browsers
            if (navigator.clipboard) {
                navigator.clipboard.writeText(promptText)
                    .then(() => {
                        console.log('Prompt copied successfully');
                        // Visual feedback for clipboard API
                        const originalText = copyButton.innerHTML;
                        copyButton.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
                        copyButton.style.background = 'rgba(46, 204, 113, 0.3)';
                        copyButton.style.borderColor = 'rgba(46, 204, 113, 0.5)';
                        
                        setTimeout(() => {
                            copyButton.innerHTML = originalText;
                            copyButton.style.background = 'rgba(255, 255, 255, 0.2)';
                            copyButton.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy prompt: ', err);
                    });
            }
        }
        
        document.body.removeChild(tempTextarea);
    }
}

// Image Lazy Loading
function initializeImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Accessibility Features
function initializeAccessibility() {
    // Keyboard navigation for tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const nextIndex = e.key === 'ArrowRight' 
                    ? (index + 1) % tabButtons.length 
                    : (index - 1 + tabButtons.length) % tabButtons.length;
                
                tabButtons[nextIndex].focus();
                tabButtons[nextIndex].click();
            }
        });
    });

    // Focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('click', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Additional CSS animation keyframes to add dynamically
const additionalStyles = `
@keyframes liquidPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.keyboard-navigation .tab-button:focus {
    outline: 3px solid #FF6B35;
    outline-offset: 2px;
}
`;

// Add additional styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Performance optimization: debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Removed hero section parallax to prevent shaking
    // Add any other scroll-based functionality here if needed
}, 16); // ~60fps

// Only add scroll listener if there's actual functionality needed
// window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Initialize tooltips for interactive elements
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Factor Profile Loading and Rendering
function initializeFactorProfile() {
    console.log('Initializing factor profile...');
    
    // Load companies list when the demo tab is clicked
    const demoTab = document.querySelector('[data-tab="demo"]');
    console.log('Demo tab found:', demoTab);
    
    if (demoTab) {
        demoTab.addEventListener('click', function() {
            console.log('Demo tab clicked, loading companies...');
            loadCompanies();
        });
    }
    
    // Also load immediately if the demo section is already active
    const demoSection = document.getElementById('demo');
    console.log('Demo section found:', demoSection);
    console.log('Demo section classes:', demoSection ? demoSection.classList : 'none');
    
    if (demoSection && demoSection.classList.contains('active')) {
        console.log('Demo section is active, loading companies immediately...');
        loadCompanies();
    }
    
    // Set up company selector change event
    const companySelector = document.getElementById('company-selector');
    if (companySelector) {
        companySelector.addEventListener('change', function() {
            const selectedCompany = this.value;
            if (selectedCompany) {
                console.log('Company selected:', selectedCompany);
                loadFactorProfile(selectedCompany);
            }
        });
    }
}

async function loadCompanies() {
    console.log('Loading companies list...');
    const companySelector = document.getElementById('company-selector');
    
    if (!companySelector) {
        console.error('Company selector not found!');
        return;
    }
    
    try {
        const response = await fetch('data/companies.json');
        if (!response.ok) {
            throw new Error(`Failed to load companies: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Companies loaded:', data);
        
        // Clear existing options
        companySelector.innerHTML = '<option value="">Select a company...</option>';
        
        // Add companies to selector
        data.companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company.filename;
            option.textContent = `${company.name} (${company.date})`;
            option.dataset.companyId = company.id;
            option.dataset.companyName = company.name;
            companySelector.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error loading companies:', error);
        companySelector.innerHTML = '<option value="">Error loading companies</option>';
    }
}

async function loadFactorProfile(filename) {
    console.log('loadFactorProfile called with filename:', filename);
    const contentContainer = document.getElementById('factor-profile-content');
    
    console.log('Content container found:', contentContainer);
    
    if (!contentContainer) {
        console.error('Content container not found!');
        return;
    }
    
    // Show loading state
    contentContainer.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading factor profile...</p>
        </div>
    `;
    
    try {
        console.log('Loading factor profile data...');
        console.log('Current URL:', window.location.href);
        console.log('Attempting to fetch: data/' + filename);
        
        const response = await fetch('data/' + filename);
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        console.log('Response URL:', response.url);
        
        if (!response.ok) {
            throw new Error(`Failed to load factor profile data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Data loaded successfully:', data);
        
        renderFactorProfile(data, contentContainer);
        
    } catch (error) {
        console.error('Error loading factor profile:', error);
        contentContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load factor profile data: ${error.message}</p>
                <p>Please check the console for more details.</p>
            </div>
        `;
    }
}

function renderFactorProfile(data, container) {
    const factorProfile = data['factor profile'];
    
    let html = '';
    
    // Render regular factors
    const regularFactors = Object.entries(factorProfile).filter(([key]) => 
        !key.startsWith('historical')
    );
    
    regularFactors.forEach(([key, value]) => {
        const factorName = key.replace(/_/g, ' ');
        html += `
            <div class="factor-card">
                <div class="factor-header">
                    <h4 class="factor-title">${factorName}</h4>
                </div>
                <div class="factor-body">
                    <p class="factor-summary">${value.summary}</p>
                    <div class="outcome-indicators">
                        ${Object.entries(value.outcomes).map(([outcome, likelihood]) => `
                            <div class="outcome-item">
                                <span class="outcome-label">${outcome.replace(/_/g, ' ')}</span>
                                <span class="outcome-value ${likelihood.replace(/ /g, '-')}">${likelihood}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    // Render historical factors
    const historicalFactors = Object.entries(factorProfile).filter(([key]) => 
        key.startsWith('historical')
    );
    
    if (historicalFactors.length > 0) {
        html += `
            <div class="historical-factors">
                <h4>Historical Financial Metrics</h4>
                <div class="historical-grid">
                    ${historicalFactors.map(([key, value]) => `
                        <div class="historical-item">
                            <h5>${key.replace(/historical /g, '').replace(/_/g, ' ')}</h5>
                            <div class="outcome-indicators">
                                ${Object.entries(value).map(([outcome, likelihood]) => `
                                    <div class="outcome-item">
                                        <span class="outcome-label">${outcome}</span>
                                        <span class="outcome-value ${likelihood.replace(/ /g, '-')}">${likelihood}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Add animation delay for smooth appearance
    setTimeout(() => {
        container.innerHTML = html;
        
        // Add staggered animation to cards
        const cards = container.querySelectorAll('.factor-card, .historical-item');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
}

// Factor Call-out Box with Typewriter Effect
function initializeFactorCallout() {
    const factorDescriptions = {
        "economic_health": "Economic health refers to the overall stability and performance of the economy, reflected in factors like growth, employment, inflation, and market confidence.",
        "market_sentiment_and_investor_psychology": "Market sentiment reflects the overall mood or attitude of investors toward a particular market, influenced by news, economic data, and global events. Investor psychology refers to the emotions and cognitive biases that drive decisions, often leading to behaviors like fear-driven selling or greed-fueled buying.",
        "political_events_and_government_policies": "Political events and government policies can significantly impact businesses and markets. This includes factors such as election outcomes, policy changes, and geopolitical tensions.",
        "natural_disasters_and_other_black_swan_events": "Natural disasters and other 'black swan' events can cause sudden and severe disruptions in financial markets, often leading to panic selling and increased volatility. Investor psychology during these events tends to be driven by fear and uncertainty, leading to irrational decisions and market overreactions.",
        "geopolitical_issues": "Such as conflicts, trade disputes, or political instability, can disrupt financial markets by increasing uncertainty and affecting investor confidence.",
        "mergers_and_major_acquisitions": "Mergers and acquisitions involve the combining of two companies, where a merger is a mutual decision to join forces, while an acquisition is when one company takes over another.",
        "regulatory_changes_and_legal_issues": "Regulatory changes often include stricter financial reporting requirements, compliance with corporate governance rules, and adherence to securities laws. Legal issues can involve insider trading, disclosure of material information, and adherence to environmental, social, and governance (ESG) standards.",
        "financial_health": "Financial health refers to the financial stability and performance of a company, reflected in factors like revenue growth, profitability, cash flow, and debt levels.",
        "company_growth": "Company growth focuses on sustainable expansion through consistent revenue increases, market share growth, and expansion into new markets or product lines.",
        "company_product_launches": "Product launches refer to the introduction of new products or services by a company.",
        "supply_chain": "Supply chain refers to the network of businesses and organizations involved in the production, distribution, and delivery of goods and services.",
        "tech_innovation": "Tech innovation refers to the development and application of new technologies to improve products, services, or internal processes.",
        "historical_eps": "Historical Earnings Per Share (EPS) represents a company's net earnings divided by the number of outstanding shares over past periods, indicating the company's profitability trends.",
        "historical_revenue": "Historical Revenue shows the company's total income from operations over past periods, indicating business growth and market demand trends.",
        "historical_stock_prices": "Historical Stock Prices reflect the market's valuation of the company over time, indicating investor confidence and market sentiment trends."
    };

    const factorItems = document.querySelectorAll('.factor-item');
    const calloutText = document.querySelector('.callout-text');
    const calloutTitle = document.querySelector('.callout-title');
    
    let currentAnimation = null;
    let debounceTimer = null;
    let isAnimating = false;
    let currentFactor = null;

    // Typewriter effect function
    function typeWriter(element, text) {
        return new Promise((resolve) => {
            isAnimating = true;
            element.textContent = '';
            element.classList.add('typing');
            
            // Calculate speed based on text length to ensure 0.5-0.8 seconds total
            const targetTime = Math.max(500, Math.min(800, text.length * 2)); // 500-800ms
            const speed = targetTime / text.length;
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    element.classList.remove('typing');
                    isAnimating = false;
                    resolve();
                }
            }, speed);
            
            // Store the timer so we can clear it if needed
            currentAnimation = timer;
        });
    }
    
    // Function to calculate adaptive font size for fixed container
    function calculateAdaptiveFontSize(text) {
        const baseSize = 16; // 1rem = 16px
        const minSize = 10;
        const maxSize = 16;
        
        // Get container dimensions (accounting for different screen sizes)
        const isMobile = window.innerWidth <= 480;
        const isTablet = window.innerWidth <= 768;
        
        // Container dimensions based on screen size
        let containerHeight, containerWidth;
        if (isMobile) {
            containerHeight = 80 - 30; // 80px - padding
            containerWidth = window.innerWidth - 80; // Account for margins/padding
        } else if (isTablet) {
            containerHeight = 95 - 40; // 95px - padding
            containerWidth = window.innerWidth - 100;
        } else {
            containerHeight = 110 - 50; // 110px - padding
            containerWidth = Math.min(1200, window.innerWidth) - 120; // Max width with padding
        }
        
        // Calculate based on text length and available space
        const textLength = text.length;
        let fontSize = baseSize;
        
        // Estimate how many characters can fit in the available space
        // Rough estimate: 1 character ≈ 0.6 * fontSize width
        // Number of lines that can fit: containerHeight / (fontSize * lineHeight)
        
        // Progressive scaling based on text length
        if (textLength > 450) {
            fontSize = Math.max(minSize, baseSize - 6);
        } else if (textLength > 350) {
            fontSize = Math.max(minSize, baseSize - 5);
        } else if (textLength > 280) {
            fontSize = Math.max(minSize, baseSize - 4);
        } else if (textLength > 220) {
            fontSize = Math.max(minSize, baseSize - 3);
        } else if (textLength > 170) {
            fontSize = Math.max(minSize, baseSize - 2);
        } else if (textLength > 120) {
            fontSize = Math.max(minSize, baseSize - 1);
        }
        
        return Math.min(maxSize, fontSize);
    }
    
    // Function to calculate adaptive line height for fixed container
    function calculateLineHeight(fontSize) {
        // Smaller font sizes need tighter line heights in fixed containers
        if (fontSize <= 10) return 1.3;
        if (fontSize <= 12) return 1.4;
        if (fontSize <= 14) return 1.5;
        return 1.6;
    }
    
    // Debounced function to handle factor display
    function displayFactor(factorKey, factorName, description) {
        // Clear any existing debounce timer
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        
        // Don't start new animation if already showing this factor
        if (currentFactor === factorKey && !isAnimating) {
            return;
        }
        
        // Set debounce timer
        debounceTimer = setTimeout(() => {
            // Clear any ongoing animation
            if (currentAnimation) {
                clearInterval(currentAnimation);
                isAnimating = false;
            }
            
            // Update current factor
            currentFactor = factorKey;
            
            // Update the title immediately
            calloutTitle.textContent = factorName;
            
            // Calculate adaptive font size
            const adaptiveFontSize = calculateAdaptiveFontSize(description);
            const adaptiveLineHeight = calculateLineHeight(adaptiveFontSize);
            
            // Apply adaptive styles
            calloutText.style.fontSize = `${adaptiveFontSize}px`;
            calloutText.style.lineHeight = adaptiveLineHeight;
            
            // Start typewriter effect
            typeWriter(calloutText, description);
        }, 100); // 100ms debounce delay
    }

    factorItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const factorKey = this.getAttribute('data-factor');
            const factorName = this.querySelector('.factor-name').textContent;
            const description = factorDescriptions[factorKey];

            if (description) {
                displayFactor(factorKey, factorName, description);
            }
        });

        item.addEventListener('mouseleave', function() {
            // Clear current factor tracking
            currentFactor = null;
            
            // Add a longer delay before reverting to default text to prevent flickering
            setTimeout(() => {
                // Only revert if no factor is currently being hovered
                if (!document.querySelector('.factor-item:hover') && currentFactor === null) {
                    // Clear any ongoing animation
                    if (currentAnimation) {
                        clearInterval(currentAnimation);
                        isAnimating = false;
                    }
                    
                    // Clear debounce timer
                    if (debounceTimer) {
                        clearTimeout(debounceTimer);
                    }
                    
                    // Revert to default
                    calloutTitle.textContent = 'Factor Description';
                    calloutText.classList.remove('typing');
                    calloutText.textContent = 'Hover over any factor below to see its detailed description.';
                    
                    // Reset font size to default
                    calloutText.style.fontSize = '1rem';
                    calloutText.style.lineHeight = '1.6';
                }
            }, 200); // Shorter delay to feel more responsive
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initializeTooltips();
    
    // Add loading animation to page
    document.body.classList.add('loaded');
    
    // Initialize any charts or visualizations
    if (typeof initializeCharts === 'function') {
        initializeCharts();
    }
});