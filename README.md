# Inline Documentation Finder

![Inline Documentation Finder Logo](logo.png)
![](icon16.jpg)

**Inline Documentation Finder** is a Chrome extension that enhances your coding experience by providing instant, inline documentation tooltips. Whether you're working on GitHub, LeetCode, or other coding platforms, this extension fetches relevant documentation from sources like MDN Web Docs, Python Documentation, and Node.js Documentation directly within your browser.

## 📖 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## 🚀 Features

- **Real-Time Documentation**: Hover over code elements to instantly view relevant documentation without leaving the page.
- **Multiple Sources**: Fetches documentation from MDN Web Docs, Python Documentation, and Node.js Documentation.
- **Customizable Settings**:
  - **Enable/Disable Extension**: Easily toggle the extension's functionality.
  - **Select Documentation Sources**: Choose which documentation sources to include.
  - **Tooltip Delay**: Adjust the delay before the tooltip appears.
  - **Dark Mode**: Switch between light and dark themes for tooltips.
- **Cross-Platform Support**: Works seamlessly across platforms like GitHub and LeetCode.
- **Caching Mechanism**: Stores fetched documentation to minimize redundant API calls and boost performance.

## 🎥 Demo

![Demo GIF](images/demo.gif)

## 🛠 Installation

### Prerequisites

- **Google Chrome**: Ensure the latest version of Chrome is installed.

### Steps

1. **Clone the Repository**:
   
   ```bash
   git clone https://github.com/Farru049/inline-documentation-finder.git
Navigate to the Project Directory:

bash
Copy code
cd inline-documentation-finder
Install Dependencies:

(If applicable, e.g., if you're using npm for package management)

bash
Copy code
npm install
Load the Extension in Chrome:

Open Chrome and navigate to chrome://extensions/.
Enable Developer mode by toggling the switch in the top right corner.
Click on Load unpacked and select the project directory (inline-documentation-finder).
Verify Installation:

The Inline Documentation Finder extension should now appear in your list of installed extensions.
Access the extension's settings by clicking on its icon next to the address bar.
📝 Usage
Activate the Extension:

Ensure the extension is enabled in chrome://extensions/.
Configure Settings:

Click the Inline Documentation Finder extension icon to open the popup.
Adjust the settings according to your preference:
Enable Extension: Toggle the extension on or off.
Documentation Sources: Choose which sources to include (MDN, Python, Node.js).
Tooltip Delay: Set the delay (in milliseconds) before the tooltip appears.
Dark Mode: Switch between light and dark themes.
Using Inline Documentation:

Navigate to a coding platform like GitHub or LeetCode.
Hover over any code element (e.g., functions, variables) to view the documentation tooltip.
Click on Read more to open the full documentation in a new tab.
📂 Project Structure
graphql
Copy code
inline-documentation-finder/
│
├── background.js           # Background service handling API requests
├── content.js              # Content script managing tooltips and interactions
├── options.js              # Options page script for managing settings
├── platform-handlers.js    # Handles platform-specific configurations
├── popup.html              # Popup UI for extension settings
├── popup.js                # Popup script managing user interactions
├── styles/
│   ├── popup.css           # Styles for the popup UI
│   └── tooltip.css         # Styles for the documentation tooltip
├── images/
│   ├── logo.png            # Extension logo
│   └── demo.gif            # Demo GIF showcasing extension features
├── manifest.json           # Chrome extension manifest file
└── README.md               # Project documentation
🛠 Configuration
Documentation Sources
The extension supports multiple documentation sources. You can enable or disable each source based on your needs:

MDN Web Docs: For JavaScript, HTML, CSS, and other web technologies.
Python Documentation: For Python programming language references.
Node.js Documentation: For Node.js runtime and APIs.
Display Settings
Tooltip Delay: Adjust the time (in milliseconds) before the tooltip appears when hovering over a code element.
Dark Mode: Enable dark mode for tooltips to match your preferred theme.
🤝 Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the Repository:

Click the Fork button at the top right corner of the repository page to create your own fork.

Clone Your Fork:

bash
Copy code
git clone https://github.com/your-username/inline-documentation-finder.git
cd inline-documentation-finder
Create a New Branch:

bash
Copy code
git checkout -b feature/your-feature-name
Make Your Changes:

Implement your feature or bug fix.

Commit Your Changes:

bash
Copy code
git add .
git commit -m "Add feature: your feature description"
Push to Your Fork:

bash
Copy code
git push origin feature/your-feature-name
Create a Pull Request:

Navigate to your forked repository on GitHub and click the Compare & pull request button.

📄 License
This project is licensed under the MIT License.

🙌 Acknowledgements
MDN Web Docs, Python.org, and Node.js for providing comprehensive documentation APIs.
Chrome Developers for extensive documentation on building Chrome extensions.
