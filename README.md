# **dbank-icp-demo**

![Version](https://img.shields.io/badge/version-1.0.0-firebrick)
![License](https://img.shields.io/github/license/andrewblais/dbank-icp-demo)
![Built with](https://img.shields.io/badge/Built%20With-Motoko%20%7C%20React%20%7C%20Internet%20Computer-29aae1)

**dbank-icp-demo** is a decentralized bank simulation built on the Internet Computer using Motoko for the backend and React (Vite) for the frontend. The app tracks a user balance and applies continuous compound interest at a real-world annual rate of 5% APR. Users can deposit or withdraw funds, and watch their balance grow automatically every 60 seconds (adjustable for demo/testing).

This project began as a Motoko + JavaScript module in Angela Yu's <a href="https://www.udemy.com/course/the-complete-web-development-bootcamp/" target="_blank" rel="noopener noreferrer">Complete Full-Stack Web Development Bootcamp</a>. I customized the style, features and functionality, and updated it to modern syntax and tooling using React, modules, docstrings, Prettier, and Material UI.

Hats off to GitHub user <a href="https://github.com/ZacIsrael" target="_blank" rel="noopener noreferrer"><strong>ZacIsrael</strong></a>, whose comments in the Udemy course's Q&amp;A helped with the React transition. His repo is here: <a href="https://github.com/ZacIsrael/dbank-defi-app" target="_blank" rel="noopener noreferrer"><strong>dbank-defi-app</strong></a>

## **_Table of Contents:_**

- [Screenshots](#-screenshots)
- [Installation](#-installationgetting-started)
- [Motoko Overview](#-motoko-backend-overview)
- [Project Structure](#-project-structure)
- [Reflections](#-reflections--lessons)
- [Resources](#-resources)
- [Author](#-andrew-blais)

## **_Screenshots:_**

#### **_App at Start:_**

<img src=./assets/dbank_icp_demo_screenshot.jpg width=360>

#### **_Popover Instructions:_**

<img src=./assets/dbank_icp_demo_popover.jpg width=320>

## **_Installation/Getting Started:_**

### Prerequisites

- <a href="https://internetcomputer.org/docs/current/developer-docs/setup/install" target="_blank" rel="noopener noreferrer">DFX SDK</a>
- <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">Node.js</a>
- <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
- <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">VS Code</a>
- <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">npm</a>

### WSL Setup Notes (for Windows Users)

Get Ubuntu/WSL working and install:

- Node (via `brew` or nvm)
- DFX SDK
- VS Code WSL extension + Motoko plugin

> WSL setup was non-trivial and required repairing Windows internals and manual linking for Node. Notes are in the full version of this README.

### Project Setup

```bash
git clone https://github.com/andrewblais/dbank-icp-demo.git
cd dbank-icp-demo
npm install
```

Start DFINITY and Vite servers:

```bash
dfx stop
dfx start --clean --background
dfx deploy
npm start
```

Local site runs at: `http://localhost:3000`

## **_Motoko Backend Overview:_**

The Motoko actor `DBank` tracks `currentValue : Float` and `currentStartTime : Int`. Compound interest is calculated using:

```
A = P * (1 + r)^t
```

- `P` = principal
- `r` = per-second interest (5% APR)
- `t` = seconds elapsed

Public interface:

- `addValue(amount : Float)`
- `removeValue(amount : Float)`
- `checkBalance() : async Float`

Interest is applied lazily upon checking balance. All state is stable.

## **_Project Structure:_**

```
dbank-icp-demo
├── .dfx/                  # Auto-generated (not committed)
├── src/
│   ├── dbank-icp-demo-frontend/
│   │   ├── index.html
│   │   ├── public/
│   │   │   └── dbank_icp_demo.ico
│   │   ├── src/
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   ├── index.css
│   │   │   ├── components/
│   │   │   │   ├── AlertBox.jsx
│   │   │   │   ├── Balance.jsx
│   │   │   │   ├── HelpTooltipButton.jsx
│   │   │   │   ├── PopoverButton.jsx
│   │   │   │   └── TransactionForm.jsx
│   │   │   ├── utils/
│   │   │   │   └── formatWithCommas.js
│   │   │   └── assets/
│   │   │       └── dbank_icp_demo.svg
│   │   └── vite.config.js
│   ├── dbank-icp-demo-backend/
│   │   └── main.mo
│   └── declarations/     # Auto-generated
├── dfx.json
├── package.json
├── tsconfig.json
├── .gitignore
├── .prettierrc
├── .env
└── README.md
```

> Note: `.dfx/` and `declarations/` are excluded from Git.

## **_Reflections & Lessons:_**

- Translating backend logic into compound interest was rewarding and deepened my Motoko understanding.
- Modular React components (`Balance`, `TransactionForm`, `AlertBox`, `HelpTooltipButton`, `PopoverButton`) keep logic focused and composable.
- `formatWithCommas.js` helps enforce numeric clarity and reduces bugs in input handling.
- Real-time balance sync is adjustable using sliders for refresh interval and acceleration.
- Using docstrings, clear props, and consistent CSS helps make this app legible to future devs.

## **_Resources:_**

- <a href="https://internetcomputer.org/docs/current" target="_blank" rel="noopener noreferrer">DFINITY Developer Docs</a>
- <a href="https://internetcomputer.org/docs/current/motoko/main/motoko" target="_blank" rel="noopener noreferrer">Motoko Language Guide</a>
- <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
- <a href="https://mui.com" target="_blank" rel="noopener noreferrer">Material UI</a>
- <a href="https://www.udemy.com/course/the-complete-web-development-bootcamp/" target="_blank" rel="noopener noreferrer">Angela Yu’s Web Dev Bootcamp</a>
- <a href="https://github.com/ZacIsrael/dbank-defi-app" target="_blank" rel="noopener noreferrer">ZacIsrael’s dbank-defi-app</a>
- <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>
- <a href="https://vitest.dev" target="_blank" rel="noopener noreferrer">Vitest</a>
- <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">ChatGPT</a>

---

### _Andrew Blais — Boston, MA_

_Studying full-stack software development, AI alignment, and applied math._

- <a href="https://www.andrewblais.dev" target="_blank" rel="noopener noreferrer">Portfolio/Website</a>
- <a href="https://github.com/andrewblais" target="_blank" rel="noopener noreferrer">GitHub</a>
