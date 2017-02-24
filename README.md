# Dark Theme for GitHub

![WIP Screenshot](screenshots/screenshot.png?raw=true)

A dark theme for GitHub

## Installation

Install a userstyle manager for your browser such as [Stylish for Chrome](https://chrome.google.com/webstore/detail/stylish/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en) or
[Stylish for Firefox](https://addons.mozilla.org/en-US/firefox/addon/stylish/)

Install [Stylish Dark GitHub](https://userstyles.org/styles/139123/stylish-dark-github) from Userstyles.org

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

This is useful for testing logged-in styles, as we can't do this locally.

* Create a new Userstyle in your manager for `domain: github.com`
* Set the Style to `@import url('https://localhost:3000/custom/style.css');`
* Log into GitHub and browse the site normally

## Supported GitHub Userscripts/Addons

Stylish Dark GitHub plays nicely with...

| Userscript | Description |
| :---       | :---        |
| [lovely-forks](https://github.com/musically-ut/lovely-forks) | Show notable forks of Github repositories under their names |
| [npmhub](https://github.com/npmhub/npmhub) | A browser extension for exploring npm dependencies on GitHub repos |
| [octotree](https://github.com/buunguyen/octotree) | Code tree for GitHub and GitLab |

Another integration you'd like to see? Please open an issue (or better yet, submit a pull request).

Overrides for userscripts should **only** affect those with the userscripts installed.

## Issues/Bugs

**Found a bug? Please open a new issue.**

Provide a screenshot, link (if you can), and CSS selector if possible.

Pull Requests also accepted :)

## License

MIT
