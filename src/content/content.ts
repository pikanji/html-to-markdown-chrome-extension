// Function to get the selected text from the page
function getSelectedText(): string {
  return window.getSelection()?.toString() || '';
}

// Function to copy text to clipboard
function copyToClipboard(text: string): boolean {
  try {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    // Make the textarea out of viewport
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.focus();
    textarea.select();
    
    // NOTE: We're using the deprecated execCommand('copy') method for compatibility reasons:
    // 1. The modern Clipboard API (navigator.clipboard.writeText) is only available in secure contexts (HTTPS)
    // 2. The Clipboard API requires explicit user permission in many browsers
    // 3. This approach works across all browsers and doesn't require permissions
    // 4. While execCommand is deprecated, it's still widely supported and the most reliable
    //    cross-browser solution for clipboard operations in content scripts
    const successful = document.execCommand('copy');
    
    // Remove the temporary textarea
    document.body.removeChild(textarea);
    
    return successful;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === 'getSelectedText') {
    console.log('getSelectedText called!');
    const selectedText = getSelectedText();
    
    if (selectedText) {
      // Copy the selected text to clipboard
      const success = copyToClipboard(selectedText);
      sendResponse({ success, text: selectedText });
    } else {
      sendResponse({ success: false, text: '' });
    }
  }
  // Return true to indicate we'll respond asynchronously
  return true;
});
