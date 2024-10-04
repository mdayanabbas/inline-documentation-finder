const openInNewTabCheckbox = document.getElementById('open-in-new-tab');
 const disableFetchingForDomainsCheckbox = document.getElementById('disable-fetching-for-domains');
const saveButton = document.getElementById('save-btn');
const statusParagraph = document.getElementById('status');

// Load saved options
chrome.storage.sync.get(['openInNewTab', 'disableFetchingForDomains'], function(result) {
  openInNewTabCheckbox.checked = result.openInNewTab;
  disableFetchingForDomainsCheckbox.checked = result.disableFetchingForDomains;
});

// Save options
saveButton.addEventListener('click', function() {
  const openInNewTab = openInNewTabCheckbox.checked;
  const disableFetchingForDomains = disableFetchingForDomainsCheckbox.checked;

  chrome.storage.sync.set({ openInNewTab, disableFetchingForDomains }, function() {
    statusParagraph.textContent = 'Options saved.';
    setTimeout(function() {
      statusParagraph.textContent = '';
    }, 2000);
  });
});