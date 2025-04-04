/// <reference types="chrome"/>

document.getElementById('exportButton')?.addEventListener('click', () => {
  console.log('exportButton clicked');
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
    if (tabs[0]?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    }
  });
}); 