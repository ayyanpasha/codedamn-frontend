# Playground App

This frontend for the playground app, following are supporting git repositories:
- Express API: https://github.com/ayyanpasha/playbook_express_api.git
- Dockerized Image to communicate with: https://github.com/ayyanpasha/playbook_docker_container_image.git
- Dockerized Playground: https://github.com/ayyanpasha/playbook_docker_container_image.git
Welcome to the Playground App! This project is a frontend application built with React, allowing users to sign up, log in, and create virtual Ubuntu containers. Within these containers, users can access a terminal, view the file structure, use a code editor, and preview their API, similar to an integrated development environment like VS Code.

## Features

- **User Authentication**: Sign up and log in with secure authentication.
- **Playground Creation**: Create and manage virtual Ubuntu containers.
- **Integrated Terminal**: Access a terminal to run commands in your container.
- **File Explorer**: View and manage files in the container.
- **Code Editor**: Write and edit code with syntax highlighting and other editor features.
- **API Preview**: See the output of your API in real-time.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>=14.x.x)
- npm (>=6.x.x) or yarn (>=1.x.x)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayyanpasha/codedamn-frontend.git
   cd codedamn-frontend

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
    ```bash
    REACT_APP_API_URL=http://<BACKEND_API_URL>:2900
    REACT_APP_WS_URL=<BACKEND_API_URL>

4. **Start the development server:**
    ```bash
    npm start

## Running the Application


1. **Sign Up / Log In**: Open the application in your browser. Sign up for a new account or log in with your existing credentials.

2. **Create a Playground**: After logging in, you will be able to create a new playground. This will spin up a virtual Ubuntu container for you.

3. **Use the Playground**: Within the playground, you can:
   - Access the terminal to run commands.
   - View and manage the file structure on the left side.
   - Write and edit code in the central code editor.
   - Preview your API output on the right side.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [xterm.js](https://xtermjs.org/) - A terminal for the web.
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - The code editor that powers VS Code.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.