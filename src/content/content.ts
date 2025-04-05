// Function to get the selected text from the page
function getSelectedText(): string {
  return window.getSelection()?.toString() || '';
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === 'getSelectedText') {
    console.log('getSelectedText called!');
    const selectedText = getSelectedText();
    sendResponse({ text: selectedText });
  }
  // Return true to indicate we'll respond asynchronously
  return true;
});
