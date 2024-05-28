# Playground App

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
- Docker (for running Ubuntu containers)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/playground-app.git
   cd playground-app

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
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

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on the code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Inspired by Visual Studio Code.
- Thanks to the open-source community for the great tools and libraries.
