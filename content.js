class DocumentationFinder {
  constructor() {
    this.settings = {
      enabled: true,
      sources: {
        mdn: true,
        python: true,
        nodejs: true
      },
      tooltipDelay: 500,
      darkMode: false
    };
    this.tooltip = null;
    this.hoverTimeout = null;
    this.currentWord = null;
    this.cache = new Map();
    
    this.init();
  }

  async init() {
    // Load settings
    const stored = await chrome.storage.sync.get(this.settings);
    this.settings = stored;

    // Create tooltip element
    this.createTooltip();

    // Add event listeners
    document.addEventListener('mouseover', this.handleMouseOver.bind(this));
    document.addEventListener('mouseout', this.handleMouseOut.bind(this));

    // Listen for settings changes
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'settingsUpdated') {
        this.settings = message.settings;
        this.updateTooltipTheme();
      }
    });
  }

  createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'doc-tooltip';
    this.tooltip.style.display = 'none';
    document.body.appendChild(this.tooltip);
    this.updateTooltipTheme();
  }

  updateTooltipTheme() {
    if (this.settings.darkMode) {
      this.tooltip.classList.add('dark-mode');
    } else {
      this.tooltip.classList.remove('dark-mode');
    }
  }

  handleMouseOver(event) {
    if (!this.settings.enabled) return;

    const target = event.target;
    if (target.matches('code, pre *, .token, .identifier')) {
      const word = target.textContent.trim();
      if (word === this.currentWord) return;
      
      this.currentWord = word;
      clearTimeout(this.hoverTimeout);
      
      this.hoverTimeout = setTimeout(async () => {
        const documentation = await this.fetchDocumentation(word);
        if (documentation) {
          this.showTooltip(documentation, event.pageX, event.pageY);
        }
      }, this.settings.tooltipDelay);
    }
  }

  handleMouseOut(event) {
    const relatedTarget = event.relatedTarget;
    if (!relatedTarget || !this.tooltip.contains(relatedTarget)) {
      clearTimeout(this.hoverTimeout);
      this.hideTooltip();
    }
  }

  hideTooltip() {
    this.tooltip.style.display = 'none';
    this.currentWord = null;
  }

  async fetchDocumentation(word) {
    if (this.cache.has(word)) {
      return this.cache.get(word);
    }

    this.showLoadingTooltip();
    
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'fetchDocumentation',
        word: word,
        sources: this.settings.sources
      });

      if (response.documentation) {
        this.cache.set(word, response.documentation);
        return response.documentation;
      }
    } catch (error) {
      console.error('Error fetching documentation:', error);
      return null;
    }
  }

  showLoadingTooltip() {
    this.tooltip.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
      </div>
    `;
    this.tooltip.style.display = 'block';
  }

  showTooltip(documentation, x, y) {
    const { description, syntax, source, url } = documentation;
    
    this.tooltip.innerHTML = `
      <h3>${this.currentWord}</h3>
      ${syntax ? `<code>${syntax}</code>` : ''}
      <p>${description}</p>
      <div class="source">Source: ${source} - <a href="${url}" target="_blank">Read more</a></div>
    `;

    // Position tooltip
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = x + 10;
    let top = y + 10;

    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - 10;
    }

    if (top + tooltipRect.height > viewportHeight) {
      top = y - tooltipRect.height - 10;
    }

    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.display = 'block';
  }
}

// Initialize the Documentation Finder
new DocumentationFinder();