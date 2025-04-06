# HTML to Markdown Converter Chrome Extension

A Chrome extension that converts selected HTML content to Markdown format with a single click.

## Features

- Convert selected HTML content to Markdown format
- Copy the converted Markdown directly to clipboard

## Installation

### From Chrome Web Store
Not released to the store, yet.

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Build the extension. See "Development" > "Setup" section below for detail
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top-right corner
5. Click "Load unpacked" and select the `dist` directory from this project
6. The extension should now be installed and visible in your Chrome toolbar

## Usage

1. Select any HTML content on a webpage
2. Click the extension icon in your Chrome toolbar
3. The selected content will be automatically converted to Markdown and copied to your clipboard
4. Paste the Markdown content wherever you need it

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/html-to-markdown-extension.git
   cd html-to-markdown-extension
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the extension:
   ```
   npm run build-dev
   ```

For development with hot reloading:
   ```
   npm run build-watch
   ```

### Project Structure

- `src/` - Source code
  - `content/` - Content script that runs on web pages
  - `popup/` - Extension popup UI
- `public/` - Static assets
  - `images/` - Extension icons
  - `popup/` - Popup HTML and assets
  - `manifest.json` - Extension manifest
  - `privacy-policy.html` - Privacy policy

### Technologies Used

- TypeScript
- Vite
- Turndown (for HTML to Markdown conversion)
- Chrome Extensions API

## Privacy

This extension:
- Only processes text that you explicitly select
- Does not collect or store any personal information
- Does not track your browsing history
- Does not send any data to external servers
- Works entirely offline

For more details, see our [Privacy Policy](./privacy-policy.html).

## License

[MIT License](./LICENSE)

## Acknowledgments

- [Turndown](https://github.com/mixmark-io/turndown) - HTML to Markdown converter
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling 