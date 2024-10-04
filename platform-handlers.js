class PlatformHandler {
    constructor() {
      this.platformConfig = {
        'github.com': {
          selectors: {
            codeBlocks: [
              '.blob-code-inner',
              '.highlight pre',
              '.markdown-body pre code'
            ],
            codeElements: [
              '.pl-en',
              '.pl-c1',
              '.pl-s1',
              '.pl-k',
              'span[class^="pl-"]'
            ]
          },
          observer: {
            target: '.repository-content',
            config: { childList: true, subtree: true }
          }
        },
        'leetcode.com': {
          selectors: {
            codeBlocks: [
              '.CodeMirror-code',
              '.monaco-editor .view-lines'
            ],
            codeElements: [
              '.CodeMirror-line span',
              '.view-line span'
            ]
          },
          observer: {
            target: '#app',
            config: { childList: true, subtree: true }
          }
        },
        'default': {
          selectors: {
            codeBlocks: ['pre', 'code'],
            codeElements: ['.token', '.identifier', 'code span']
          },
          observer: {
            target: 'body',
            config: { childList: true, subtree: true }
          }
        }
      };
    }
  
    getCurrentPlatform() {
      const hostname = window.location.hostname;
      return this.platformConfig[hostname] || this.platformConfig.default;
    }
  
    getCodeElementFromEvent(event) {
      const platform = this.getCurrentPlatform();
      const target = event.target;
      
      // Check if element matches any platform-specific selectors
      return platform.selectors.codeElements.some(selector => 
        target.matches(selector)) ? target : null;
    }
  
    setupObserver(callback) {
      const platform = this.getCurrentPlatform();
      const target = document.querySelector(platform.observer.target);
      
      if (target) {
        const observer = new MutationObserver(callback);
        observer.observe(target, platform.observer.config);
        return observer;
      }
      return null;
    }
  
    getWordFromElement(element) {
      const hostname = window.location.hostname;
      
      if (hostname.includes('github.com')) {
        return this.getGithubWord(element);
      } else if (hostname.includes('leetcode.com')) {
        return this.getLeetCodeWord(element);
      }
      
      return element.textContent.trim();
    }
  
    getGithubWord(element) {
      // Handle GitHub's specific syntax highlighting
      const text = element.textContent.trim();
      // Remove common GitHub syntax markers
      return text.replace(/^['"]+|['"]+$/g, '');
    }
  
    getLeetCodeWord(element) {
      if (element.closest('.CodeMirror')) {
        return this.getCodeMirrorWord(element);
      } else if (element.closest('.monaco-editor')) {
        return this.getMonacoWord(element);
      }
      return element.textContent.trim();
    }
  
    getCodeMirrorWord(element) {
      const line = element.closest('.CodeMirror-line');
      if (!line) return element.textContent.trim();
  
      const text = line.textContent;
      const elementIndex = Array.from(line.children).indexOf(element);
      return this.extractWord(text, elementIndex);
    }
  
    getMonacoWord(element) {
      const text = element.textContent.trim();
      return text.match(/[\w$]+/)?.[0] || text;
    }
  
    extractWord(text, index) {
      const words = text.split(/\s+/);
      return words[index] || '';
    }
  }