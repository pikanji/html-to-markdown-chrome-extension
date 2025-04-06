// Import Turndown for HTML to Markdown conversion
import TurndownService from 'turndown';

// Function to get the selected text from the page
function getSelectedText(): string {
  return window.getSelection()?.toString() || '';
}

// Function to get the selected HTML from the page
function getSelectedHTML(): string {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return '';
  }

  const range = selection.getRangeAt(0);
  const container = document.createElement('div');
  container.appendChild(range.cloneContents());
  return container.innerHTML;
}

// Function to convert HTML to Markdown
function convertHTMLToMarkdown(html: string): string {
  console.log('Selected HTML:', html);

  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });
  
  // Add a custom rule to handle p tags inside li elements
  turndownService.addRule('paragraphInListItem', {
    filter: function (node) {
      // Check if this is a p element that is a direct child of an li element
      return node.nodeName === 'P' && 
             node.parentNode !== null && 
             node.parentNode.nodeName === 'LI';
    },
    replacement: function (content) {
      // Return the content of the p tag without the p tag itself
      return content;
    }
  });
  
  return turndownService.turndown(html);
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
    
    // Get both plain text and HTML selection
    const selectedText = getSelectedText();
    const selectedHTML = getSelectedHTML();
    
    if (selectedText) {
      // Convert HTML to Markdown
      const markdown = convertHTMLToMarkdown(selectedHTML);
      
      // Copy the Markdown to clipboard
      const success = copyToClipboard(markdown);
      sendResponse({ success, text: markdown, originalText: selectedText });
    } else {
      sendResponse({ success: false, text: '', originalText: '' });
    }
  }
  // Return true to indicate we'll respond asynchronously
  return true;
});
