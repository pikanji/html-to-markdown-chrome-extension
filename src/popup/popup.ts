/// <reference types="chrome"/>

// Function to get selected text from the active tab and copy it to clipboard
function getSelectedTextFromActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
    if (tabs[0]?.id) {
      // Send message to content script to get selected text and copy it
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelectedText' }, (response) => {
        if (response) {
          if (response.success && response.text) {
            console.log('Text copied to clipboard:', response.text);
            // Show success message in the popup
            showMessage('Text copied to clipboard!', 'success');
          } else {
            console.log('No text selected or copy failed');
            // Show error message in the popup
            showMessage('No text selected', 'error');
          }
        }
      });
    }
  });
}

// Function to show a message in the popup
function showMessage(message: string, type: 'success' | 'error') {
  // Create message element if it doesn't exist
  let messageElement = document.getElementById('message');
  if (!messageElement) {
    messageElement = document.createElement('div');
    messageElement.id = 'message';
    document.body.appendChild(messageElement);
  }
  
  // Set message content and style
  messageElement.textContent = message;
  messageElement.style.padding = '10px';
  messageElement.style.marginTop = '10px';
  messageElement.style.borderRadius = '4px';
  
  // Set color based on message type
  if (type === 'success') {
    messageElement.style.backgroundColor = '#dff0d8';
    messageElement.style.color = '#3c763d';
  } else {
    messageElement.style.backgroundColor = '#f2dede';
    messageElement.style.color = '#a94442';
  }
}

// Get selected text when popup loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup loaded');
  getSelectedTextFromActiveTab();
}); 