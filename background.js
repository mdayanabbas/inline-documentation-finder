class DocumentationService {
  constructor() {
    this.documentationSources = {
      mdn: {
        baseUrl: 'https://developer.mozilla.org/api/v1/search',
        parseResponse: this.parseMDNResponse.bind(this)
      },
      python: {
        baseUrl: 'https://docs.python.org/3/search.html',
        parseResponse: this.parsePythonResponse.bind(this)
      },
      nodejs: {
        baseUrl: 'https://nodejs.org/api/',
        parseResponse: this.parseNodeResponse.bind(this)
      }
    };

    this.setupListeners();
  }

  setupListeners() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'fetchDocumentation') {
        this.fetchDocumentation(message.word, message.sources)
          .then(documentation => sendResponse({ documentation }))
          .catch(error => {
            console.error('Error fetching documentation:', error);
            sendResponse({ error: error.message });
          });
        return true; // Required for async response
      }
    });
  }

  async fetchDocumentation(word, enabledSources) {
    const fetchPromises = Object.entries(this.documentationSources)
      .filter(([source]) => enabledSources[source])
      .map(([source, config]) => this.fetchFromSource(word, source, config));

    const results = await Promise.all(fetchPromises);
    
    // Return the first successful result or null if all fail
    return results.find(result => result !== null) || null;
  }

  async fetchFromSource(word, source, config) {
    try {
      const response = await fetch(this.buildUrl(config.baseUrl, word));
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return config.parseResponse(data, word);
    } catch (error) {
      console.error(`Error fetching from ${source}:`, error);
      return null; // Return null on error to allow other sources to be checked
    }
  }

  buildUrl(baseUrl, query) {
    const url = new URL(baseUrl);
    url.searchParams.append('q', query);
    return url.toString();
  }

  parseMDNResponse(data, word) {
    if (!data.documents || data.documents.length === 0) return null;

    const bestMatch = data.documents.find(doc => 
      doc.title.toLowerCase().includes(word.toLowerCase())
    );

    if (!bestMatch) return null;

    return {
      description: bestMatch.summary,
      syntax: bestMatch.syntax,
      source: 'MDN Web Docs',
      url: `https://developer.mozilla.org${bestMatch.mdn_url}`
    };
  }

  parsePythonResponse(data, word) {
    if (!data.results || data.results.length === 0) return null;

    const bestMatch = data.results.find(result => 
      result.title.toLowerCase().includes(word.toLowerCase())
    );

    if (!bestMatch) return null;

    return {
      description: bestMatch.description,
      syntax: bestMatch.syntax,
      source: 'Python Documentation',
      url: `https://docs.python.org/3/${bestMatch.path}`
    };
  }

  parseNodeResponse(data, word) {
    if (!data.matches || data.matches.length === 0) return null;

    const bestMatch = data.matches.find(match => 
      match.name.toLowerCase().includes(word.toLowerCase())
    );

    if (!bestMatch) return null;

    return {
      description: bestMatch.description,
      syntax: bestMatch.syntax,
      source: 'Node.js Documentation',
      url: `https://nodejs.org/api/${bestMatch.path}`
    };
  }

  sanitizeHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent;
  }
}

// Initialize the Documentation Service
new DocumentationService();
