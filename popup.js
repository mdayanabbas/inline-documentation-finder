document.addEventListener('DOMContentLoaded', () => {
  // Load saved settings
  chrome.storage.sync.get({
    enabled: true,
    sources: {
      mdn: true,
      python: true,
      nodejs: true
    },
    tooltipDelay: 500,
    darkMode: false
  }, (settings) => {
    document.getElementById('enableExtension').checked = settings.enabled;
    document.getElementById('mdn').checked = settings.sources.mdn;
    document.getElementById('python').checked = settings.sources.python;
    document.getElementById('nodejs').checked = settings.sources.nodejs;
    document.getElementById('tooltipDelay').value = settings.tooltipDelay;
    document.getElementById('darkMode').checked = settings.darkMode;
  });

  // Save settings
  document.getElementById('saveSettings').addEventListener('click', () => {
    const settings = {
      enabled: document.getElementById('enableExtension').checked,
      sources: {
        mdn: document.getElementById('mdn').checked,
        python: document.getElementById('python').checked,
        nodejs: document.getElementById('nodejs').checked
      },
      tooltipDelay: parseInt(document.getElementById('tooltipDelay').value),
      darkMode: document.getElementById('darkMode').checked
    };

    chrome.storage.sync.set(settings, () => {
      // Notify content script of settings change
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'settingsUpdated',
          settings: settings
        });
      });

      // Show save confirmation
      const button = document.getElementById('saveSettings');
      const originalText = button.textContent;
      button.textContent = 'Saved!';
      button.style.backgroundColor = '#4CAF50';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '#2196F3';
      }, 1500);
    });
  });
});