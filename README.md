# Dark Theme for GitHub

![WIP Screenshot](screenshots/screenshot.png?raw=true)

A dark theme for GitHub

## Installation

Install a userstyle manager for our browser such as [Stylish for Chrome](https://chrome.google.com/webstore/detail/stylish/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en) or
[Stylish for Firefox](https://addons.mozilla.org/en-US/firefox/addon/stylish/)

Install [Stylish Dark Github](https://userstyles.org/styles/139123/stylish-dark-github) from Userstyles.org

Alternatively, manually install it by copy-pasting the [latest release](https://github.com/rmcfadzean/stylish-github/releases/latest) into a new style in your userstyle manager.

## Development

### Clone the repo

`$ git clone https://github.com/rmcfadzean/stylish-github.git`

### Install the dependencies

`$ yarn install`

### Run Gulp

`$ gulp`

### Open the local site

`https://localhost:3000`

### Setup Testing Theme

This is useful for testing logged-in styles as we can't do this locally.

* Create a new Userstyle in your manager for `domain: github.com`
* Set the Style to `@import url('https://localhost:3000/custom/style.css');`
* Browser logged in github as normal

## Issues/Bugs

Please open a new issue. Provide a screenshot, link (if you can), and CSS selector if possible.

Pull Requests also accepted :)

## License

MIT
