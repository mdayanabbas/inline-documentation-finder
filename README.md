# Inline Documentation Finder

![Inline Documentation Finder Logo](icon16.png)

**Inline Documentation Finder** is a powerful Chrome extension designed to enhance your coding experience by providing instant, inline documentation tooltips. Whether you're working on GitHub, LeetCode, or other coding platforms, this extension fetches relevant documentation from sources like MDN Web Docs, Python Documentation, and Node.js Documentation, directly within your browser.

## 📖 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## 🚀 Features

- **Real-Time Documentation**: Hover over code elements to instantly view relevant documentation without leaving your current page.
- **Multiple Sources**: Fetches documentation from MDN Web Docs, Python Documentation, and Node.js Documentation.
- **Customizable Settings**:
  - **Enable/Disable Extension**: Toggle the extension's functionality on or off.
  - **Select Documentation Sources**: Choose which documentation sources to include.
  - **Tooltip Delay**: Adjust the delay before the tooltip appears.
  - **Dark Mode**: Switch between light and dark themes for tooltips.
- **Responsive Design**: Works seamlessly across various coding platforms like GitHub and LeetCode.
- **Caching Mechanism**: Stores fetched documentation to reduce redundant API calls and enhance performance.

## 🛠 Installation

### Prerequisites

- **Google Chrome**: Ensure you have the latest version of Chrome installed.
# Navigate to the Project Directory:

cd inline-documentation-finder

# Install Dependencies (if applicable, e.g., if you're using npm for package management):

npm install

# Load the Extension in Chrome:

# 1. Open Chrome and navigate to chrome://extensions/.
# 2. Enable Developer mode by toggling the switch in the top right corner.
# 3. Click on 'Load unpacked' and select the project directory (inline-documentation-finder).

# Verify Installation:

# The Inline Documentation Finder extension should now appear in your list of installed extensions.
# You can access the extension's settings by clicking on the extension icon next to the address bar.

# Test the Extension:

# Open a new tab and navigate to GitHub, LeetCode, or any supported coding platform.
# Hover over a code element like a function, variable, or keyword.
# You should see a tooltip appear with relevant documentation fetched from the selected sources.

# Customize Your Experience:

# Click on the Inline Documentation Finder icon in the Chrome toolbar to access the popup.
# Configure the settings to adjust which documentation sources are used, enable dark mode, and set the tooltip delay.

# Enjoy Real-Time Documentation:

# The extension now works inline as you browse coding platforms, offering you helpful documentation directly in the browser.

# 📝 Usage
# Activate the Extension:

# Ensure the extension is enabled in chrome://extensions/.

# Configure Settings:

# Click on the Inline Documentation Finder extension icon to open the popup.
# Adjust the settings as per your preference:
# - Enable Extension: Toggle the extension on or off.
# - Documentation Sources: Select which sources to include (MDN, Python, Node.js).
# - Tooltip Delay: Set the delay (in milliseconds) before the tooltip appears.
# - Dark Mode: Switch between light and dark themes.

# Using Inline Documentation:

# Navigate to a coding platform like GitHub or LeetCode.
# Hover over any code element (e.g., functions, variables) to view the documentation tooltip.
# Click on 'Read more' to open the full documentation in a new tab.

# 📂 Project Structure
# inline-documentation-finder/
# │
# ├── background.js           # Background service handling API requests
# ├── content.js              # Content script managing tooltips and interactions
# ├── options.js              # Options page script for managing settings
# ├── platform-handlers.js    # Handles platform-specific configurations
# ├── popup.html              # Popup UI for extension settings
# ├── popup.js                # Popup script managing user interactions
# ├── styles/
# │   ├── popup.css           # Styles for the popup UI
# │   └── tooltip.css         # Styles for the documentation tooltip
# ├── images/
# │   ├── logo.png            # Extension logo
# │   └── demo.gif            # Demo GIF showcasing extension features
# ├── manifest.json           # Chrome extension manifest file
# └── README.md               # Project documentation
