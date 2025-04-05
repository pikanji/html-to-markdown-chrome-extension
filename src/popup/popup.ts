/// <reference types="chrome"/>

document.getElementById('exportButton')?.addEventListener('click', () => {
  console.log('exportButton clicked');
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
    if (tabs[0]?.id) {
      // Send message to content script to get selected text
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelectedText' }, (response) => {
        if (response && response.text) {
          console.log('Selected text:', response.text);
          // Here you can handle the selected text, e.g., display it in the popup
          // or process it further
        } else {
          console.log('No text selected');
        }
      });
    }
  });
}); 