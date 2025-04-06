/// <reference types="chrome"/>

// Function to show a message in the popup
function showMessage(message: string, type: 'success' | 'error' | 'info') {
  const statusElement = document.getElementById('statusMessage');
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.className = `status ${type}`;
    statusElement.style.display = 'block';
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
      setTimeout(() => {
        statusElement.style.display = 'none';
      }, 3000);
    }
  }
}

// Function to get selected text from the active tab and copy it to clipboard
function getSelectedTextFromActiveTab() {
  showMessage('Processing selection...', 'info');
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
    if (tabs[0]?.id) {
      // Send message to content script to get selected text and copy it
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelectedText' }, (response) => {
        if (response) {
          if (response.success && response.text) {
            console.log('Text copied to clipboard:', response.text);
            // Show success message in the popup
            showMessage('Markdown copied to clipboard!', 'success');
          } else {
            console.log('No text selected or copy failed');
            // Show error message in the popup
            showMessage('No text selected. Please select some text on the page first.', 'error');
          }
        } else {
          // Handle case where content script might not be loaded
          showMessage('Error: Could not communicate with the page. Please refresh the page and try again.', 'error');
        }
      });
    } else {
      showMessage('Error: Could not access the active tab.', 'error');
    }
  });
}

// Get selected text when popup loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup loaded');
  getSelectedTextFromActiveTab();
}); 